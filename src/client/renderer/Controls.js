import _ from 'three';
import config from './config';
import ac from '../../state/actionCreators';

export default class Controls /*extends _.EventDispatcher*/ {
	
	constructor(camera, domElement, store) {
		// super();
		
		if (!camera || !domElement || !store) throw new Error('Missing arg');
		
		this.store = store;
		this.camera = camera;
		this.domElement = domElement;
		
		this.target = new _.Vector3();
		this.zoomSpeed = 1;
		
		this.enabled = true;
		this.cameraState = null;
		this.shouldUpdateCamera = false;
		
		// Current position in spherical coordinate system.
		this.phi;
		this.theta;
		this.radius;
		
		// Pending changes
		this.dPhi = 0;
		this.dTheta = 0;
		this.scale = 1;
		
		// so camera.up is the orbit axis
		this.quat = new _.Quaternion().setFromUnitVectors(this.camera.up, new _.Vector3(0, 1, 0));
		this.quatInverse = this.quat.clone().inverse();
		this.lastPosition = new _.Vector3();
		this.lastQuaternion = new _.Quaternion();
		
		
		/* CONFIG */
		
		this.minDistance = config.earthRadius + 10;
		this.maxDistance = 6 * config.earthRadius;
		
		// How far you can orbit vertically, upper and lower limits.
		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians
		
		// How far you can orbit horizontally, upper and lower limits.
		// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
		this.minAzimuthAngle = -Infinity; // radians
		this.maxAzimuthAngle = Infinity; // radians
		
		
		/* INITIALIZATION */
		
		// Event Listeners
		this.domElement.addEventListener('contextmenu', this.contextmenu.bind(this), false);
		this.domElement.addEventListener('mousewheel', this.onMouseWheel.bind(this), false);
		this.domElement.addEventListener('MozMousePixelScroll', this.onMouseWheel.bind(this), false); // firefox
		
		// forces an update at start
		this.update(true);
		// this.computeAndDispatchCameraParams();
		this.store.subscribe(this.update.bind(this));
		
	}
	
	// Suscribed to store updates
	update(force) {
		const state = this.store.getState();
		
		if (state.lastAction.type.endsWith('CAMERA') || force) {
			const { position: { x, y, z }, near, far } = state.camera;
			
			this.camera.position.x = x;
			this.camera.position.y = y;
			this.camera.position.z = z;
			this.camera.near = near;
			this.camera.far = far;
			this.camera.lookAt(this.target);
			
			this.camera.updateProjectionMatrix();
		}
	}
	
	// Handles spherical to cartesian conversion and dispatches the new camera position
	computeAndDispatchCameraParams() {
		const { sqrt, max, min, sin, cos, atan2, PI } = Math;
		const { target, quat, quatInverse, minDistance, maxDistance, scale } = this;
		
		const offset = this.camera.position.clone().sub(target);
		
		// Rotate offset to "y-axis-is-up" space
		offset.applyQuaternion(quat);
		
		// Angle from z-axis around y-axis
		this.theta = atan2(offset.x, offset.z);
		
		// Angle from y-axis
		this.phi = atan2(sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);
		
		// restrict this.phi to be betwee this.EPS and PI-this.EPS
		// this.phi = max(EPS, min(PI - EPS, this.phi));
		
		// restrict radius to be between desired limits
		const radius = max(minDistance, min(maxDistance, offset.length() * scale));
		
		offset.x = radius * sin(this.phi) * sin(this.theta);
		offset.y = radius * cos(this.phi);
		offset.z = radius * sin(this.phi) * cos(this.theta);
		
		// rotate offset back to "camera-up-vector-is-up" space
		offset.applyQuaternion(quatInverse);
		
		// New position
		const { x, y, z } = this.target.clone().add(offset);
		// console.log(x, y, z, this.scale)
		this.store.dispatch(ac.updateCameraPosition(x, y, z));
		
		this.scale = 1;
	}

	
	onMouseWheel(event) {
		const { enabled, cameraState } = this;
		
		if (!enabled || cameraState) return;
		
		event.preventDefault();
		event.stopPropagation();
		
		// Cross-plateform event
		const delta = event.wheelDelta ? event.wheelDelta : event.detail ? -event.detail : 0;
		
		if (delta === 0) return;
		else if (delta > 0) this.scale *= Math.pow(0.95, this.zoomSpeed);
		else if (delta < 0) this.scale /= Math.pow(0.95, this.zoomSpeed);
		
		this.computeAndDispatchCameraParams();
	}
	
	contextmenu(event) {
		event.preventDefault();
	}
	
}
