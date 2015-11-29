import _ from 'three';
import config from './config';

export default class ControlsConstraint {
		
	constructor(camera) {
		this.camera = camera;
		
		// "target" sets the location of focus, where the camera orbits around
		// and where it pans with respect to.
		this.target = new _.Vector3();
		
		// Limits to how far you can dolly in and out (PerspectiveCamera only)
		this.minDistance = config.earthRadius;
		this.maxDistance = config.sunEarthDistance;
		
		// Limits to how far you can zoom in and out (OrthographicCamera only)
		this.minZoom = 0;
		this.maxZoom = Infinity;
		
		// How far you can orbit vertically, upper and lower limits.
		// Range is 0 to Math.PI radians.
		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians
		
		// How far you can orbit horizontally, upper and lower limits.
		// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
		this.minAzimuthAngle = - Infinity; // radians
		this.maxAzimuthAngle = Infinity; // radians
		
		// Set to true to enable damping (inertia)
		// If damping is enabled, you must call controls.update() in your animation loop
		this.enableDamping = false;
		this.dampingFactor = 0.25;
		
		////////////
		// internals
		
		this.EPS = 0.000001;
		
		// Current position in spherical coordinate system.
		this.theta;
		this.phi;
		
		// Pending changes
		this.phiDelta = 0;
		this.thetaDelta = 0;
		this.scale = 1;
		this.panOffset = new _.Vector3();
		this.zoomChanged = false;
		
		// methods
		this.update = this.handleUpdate();
		
		this.rotationSpeed = Math.PI / 180;
		this.rotationState = { up: false, down: false, left: false, right: false };
		
	}
	
	startRotation (direction) {
		switch (direction) {
		
		case 'left':
			this.rotationState.left = true;
			this.rotationState.right = false;
			break;
		
		case 'right':
			this.rotationState.right = true;
			this.rotationState.left = false;
			break;
		
		case 'up':
			this.rotationState.up = true;
			this.rotationState.down = false;
			break;
		
		case 'down':
			this.rotationState.down = true;
			this.rotationState.up = false;
			break;
		}
	}
	
	stopRotation (direction) {
		switch (direction) {
		
		case 'left':
			this.rotationState.left = false;
			break;
		
		case 'right':
			this.rotationState.right = false;
			break;
		
		case 'up':
			this.rotationState.up = false;
			break;
		
		case 'down':
			this.rotationState.down = false;
			break;
		}
	}
	
	
	dollyIn (dollyScale) {
		const { camera, minZoom, maxZoom } = this;
		
		if (camera instanceof _.PerspectiveCamera) this.scale /= dollyScale;
		else if (camera instanceof _.OrthographicCamera) {
			this.camera.zoom = Math.max(minZoom, Math.min(maxZoom, camera.zoom * dollyScale));
			this.camera.updateProjectionMatrix();
			this.zoomChanged = true;
			
			
		} else console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
	}
	
	dollyOut (dollyScale) {
		const { camera, minZoom, maxZoom } = this;
		
		if (camera instanceof _.PerspectiveCamera) this.scale *= dollyScale;
		else if (camera instanceof _.OrthographicCamera) {
			this.camera.zoom = Math.max(minZoom, Math.min(maxZoom, camera.zoom / dollyScale));
			this.camera.updateProjectionMatrix();
			this.zoomChanged = true;
		
		} else 	console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
	}
	
	handleUpdate () {
		const offset = new _.Vector3();
		
		// so camera.up is the orbit axis
		const quat = new _.Quaternion().setFromUnitVectors(this.camera.up, new _.Vector3(0, 1, 0));
		const quatInverse = quat.clone().inverse();
		
		const lastPosition = new _.Vector3();
		const lastQuaternion = new _.Quaternion();
		
		return () => {
			const position = this.camera.position;
			const { sqrt, max, min, sin, cos, atan2, PI } = Math;
			const { 
				target, thetaDelta, phiDelta, EPS, scale, zoomChanged, rotationSpeed, rotationState: { up, down, left, right },
				minAzimuthAngle, maxAzimuthAngle, minPolarAngle, maxPolarAngle, minDistance, maxDistance,
			} = this;
			
			offset.copy(position).sub(target);
			
			// rotate offset to "y-axis-is-up" space
			offset.applyQuaternion(quat);
			
			// angle from z-axis around y-axis
			this.theta = atan2(offset.x, offset.z);
			
			// angle from y-axis
			this.phi = atan2(sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);
			
			if (up) this.phi -= rotationSpeed;
			if (down) this.phi += rotationSpeed;
			if (left) this.theta -= rotationSpeed;
			if (right) this.theta += rotationSpeed;
			
			// restrict this.theta to be between desired limits
			this.theta = max(minAzimuthAngle, min(maxAzimuthAngle, this.theta));
			
			// restrict this.phi to be between desired limits
			this.phi = max(minPolarAngle, min(maxPolarAngle, this.phi));
			
			// restrict this.phi to be betwee this.EPS and PI-this.EPS
			this.phi = max(EPS, min(PI - EPS, this.phi));
			
			// restrict radius to be between desired limits
			const radius = max(minDistance, min(maxDistance, offset.length() * scale));
			
			offset.x = radius * sin(this.phi) * sin(this.theta);
			offset.y = radius * cos(this.phi);
			offset.z = radius * sin(this.phi) * cos(this.theta);
			
			// rotate offset back to "camera-up-vector-is-up" space
			offset.applyQuaternion(quatInverse);
			
			position.copy(this.target).add(offset);
			
			this.camera.lookAt(this.target);
			
			this.thetaDelta = 0;
			this.phiDelta = 0;
			this.scale = 1;
			this.panOffset.set(0, 0, 0);
			
			// update condition is:
			// min(camera displacement, camera rotation in radians)^2 > this.EPS
			// using small-angle approximation cos(x/2) = 1 - x^2 / 8
			
			const p = this.camera.position;
			const q = this.camera.quaternion;
			if (zoomChanged || lastPosition.distanceToSquared(p) > EPS || 8 * (1 - lastQuaternion.dot(q)) > EPS) {
				lastPosition.copy(p);
				lastQuaternion.copy(q);
				this.zoomChanged = false;
				
				return true;
			}
			
			return false;
		};
	}
}
