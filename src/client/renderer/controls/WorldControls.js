import _ from 'three';
import config from '../config';
import ac from '../../../state/actionCreators';

export default class MapControls {
	
	constructor(camera, domElement, store) {
		
		if (!camera || !domElement || !store) throw new Error('Missing arg');
		
		this.store = store;
		this.camera = camera;
		this.domElement = domElement;
		
		this.target = new _.Vector3();
		
		// Current position in spherical coordinate system.
		this.phi;
		this.theta;
		this.radius;
		
		// Pending changes
		this.dPhi = 0;
		this.dTheta = 0;
		this.scale = 1;
		this.rotateStart = new _.Vector2();
		this.rotateEnd = new _.Vector2();
		
		/* CONFIG */
		this.enabled = true;
		this.epsilon = 0.0001;
		this.zoomSpeed = 1;
		this.rotationSpeed = 0.7;
		this.minDistance = 10;
		this.maxDistance = 200;
		
		/* INITIALIZATION */
		
		// Event Listeners
		this.domElement.addEventListener('contextmenu', this.contextmenu.bind(this), false);
		this.domElement.addEventListener('mousewheel', this.onMouseWheel.bind(this), false);
		this.domElement.addEventListener('MozMousePixelScroll', this.onMouseWheel.bind(this), false); // firefox
		this.domElement.addEventListener('mousedown', this.onMouseDown.bind(this), false);
		this.domElement.addEventListener('mouseup', this.onMouseUp.bind(this), false);
		this.onMouseMoveFn = this.onMouseMove.bind(this);
		
		const { position: { x, y, z }, near, far, target } = this.store.getState().camera;
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.position.z = z;
    this.camera.near = near;
    this.camera.far = far;
    this.camera.lookAt(this.target);
		this.lastPosition = new _.Vector3(x, y, z);
    this.camera.updateProjectionMatrix();
    
		this.store.subscribe(this.update.bind(this));
	}
	
	// Suscribed to store updates
	update() {
		// This should be a controlsController, not a cameraController --> Oso.js ?
		const state = this.store.getState();
		
		if (state.lastAction.type === 'UPDATE_CAMERA_POSITION') {
			
			this.camera.position.copy(state.camera.position);
			this.camera.lookAt(state.avatar.position);
			this.camera.updateProjectionMatrix();
			
		}
	}
	
	// Handles spherical to cartesian conversion and dispatches the new camera position
	computeAndDispatchCameraParams() {
		const { sqrt, max, min, sin, cos, atan2, PI } = Math;
		const { target, scale, minDistance, maxDistance, epsilon } = this;
		
		const offset = this.camera.position.clone().sub(target);
		
		
		// Angle from z-axis around y-axis
		this.theta = atan2(offset.x, offset.y) + this.dTheta;
		
		// Angle from z-axis
		this.phi = atan2(sqrt(offset.x * offset.x + offset.y * offset.y), offset.z) + this.dPhi;
    this.phi = max(epsilon, min(PI - epsilon, this.phi));
    
		// Restricts radius to be between desired limits
		const radius = max(minDistance, min(maxDistance, offset.length() * scale));
		
		offset.x = radius * sin(this.phi) * sin(this.theta);
		offset.y = radius * sin(this.phi) * cos(this.theta);
		offset.z = radius * cos(this.phi);
		
		// New position
		const newPosition = this.target.clone().add(offset);
		if (!this.lastPosition.equals(newPosition)) this.store.dispatch(ac.updateCameraPosition(newPosition));
		
		this.scale = 1;
		this.dTheta = 0;
		this.dPhi = 0;
		this.lastPosition.copy(newPosition);
	}

	
	onMouseWheel(event) {
		if (!this.enabled) return;
		
		event.preventDefault();
		event.stopPropagation();
		
		// Cross-plateform event
		const delta = event.wheelDelta ? event.wheelDelta : event.detail ? -event.detail : 0;
		
		if (delta === 0) return;
		else if (delta > 0) this.scale *= Math.pow(0.95, this.zoomSpeed);
		else if (delta < 0) this.scale /= Math.pow(0.95, this.zoomSpeed);
		
		this.computeAndDispatchCameraParams();
	}
	
	onMouseDown(event) {
		if (!this.enabled) return;
		if (event.button === 2) {
      this.rotateStart.set(event.clientX, event.clientY);
      this.domElement.addEventListener('mousemove', this.onMouseMoveFn, false);
		}
	}
	
	onMouseUp(event) {
		if (!this.enabled) return;
    if (event.button === 2) {
      this.domElement.removeEventListener('mousemove', this.onMouseMoveFn, false);
    }
	}
	
	onMouseMove(event) {
    this.rotateEnd.set(event.clientX, event.clientY);
    
    // rotating across whole screen goes 360 degrees around
    this.dTheta += 2 * Math.PI * (this.rotateEnd.x - this.rotateStart.x) / this.domElement.clientWidth * this.rotationSpeed;
    
    // rotating up and down along whole screen attempts to go 360, but limited to 180
    this.dPhi -= 2 * Math.PI * (this.rotateEnd.y - this.rotateStart.y) / this.domElement.clientHeight * this.rotationSpeed;
    
    this.rotateStart.copy(this.rotateEnd);
    
    this.computeAndDispatchCameraParams();
	}
	
	contextmenu(event) {
		event.preventDefault();
	}
}
