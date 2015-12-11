import _ from 'three';
import config from './config';
import ControlsConstraint from './ControlsConstraint';

export default class Controls extends _.EventDispatcher {
	
	constructor(camera, domElement) {
		super();
		
		this.camera = camera;
		this.domElement = domElement || document;
		this.constraint = new ControlsConstraint(this.camera);
		
		this.target = this.constraint.target;
		
		// Set to false to disable this control
		this.enabled = true;
		this.enableZoom = true;
		this.enableKeys = true;
		
		this.zoomSpeed = 1;
		
		this.keys = { 
			// LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40, 
			// A: 65, E: 69,
			Z: 90, Q: 81, S: 83, D: 68,
		};
		
		// this.mouseButtons = { ORBIT: _.MOUSE.LEFT, ZOOM: _.MOUSE.MIDDLE, PAN: _.MOUSE.RIGHT };
		
		this.STATE = { NONE : - 1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };
		
		this.state = this.STATE.NONE;
		
		// for reset
		this.target0 = this.target.clone();
		this.position0 = this.camera.position.clone();
		this.zoom0 = this.camera.zoom;
		
		// events
		this.events = {
			changeEvent: { type: 'change' },
			startEvent: { type: 'start' },
			endEvent: { type: 'end' },
		};
		
		this.domElement.addEventListener( 'contextmenu', this.contextmenu.bind(this), false );
		this.domElement.addEventListener( 'mousewheel', this.onMouseWheel.bind(this), false );
		this.domElement.addEventListener( 'MozMousePixelScroll', this.onMouseWheel.bind(this), false ); // firefox
		window.addEventListener( 'keydown', this.onKeyDown.bind(this), false );
		window.addEventListener( 'keyup', this.onKeyUp.bind(this), false );
		
		// getters
		// this.getAutoRotationAngle = () => 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
		this.getZoomScale = () => Math.pow(0.95, this.zoomSpeed);
		
		// force an update at start
		this.update();
	}
	
	update() {
		if ( this.constraint.update() === true ) {
			this.dispatchEvent(this.events.changeEvent);
		}
	};
	
	onKeyDown( event ) {
		
		const { enabled, enableKeys, keys, constraint } = this;
		
		if ( !enabled || !enableKeys) return;
		
		switch ( event.keyCode ) {
			
			case keys.Z:
				constraint.startRotation('up');
				break;
			case keys.S:
				constraint.startRotation('down');
				break;
			case keys.Q:
				constraint.startRotation('left');
				break;
			case keys.D:
				constraint.startRotation('right');
				break;
		}

	}
	
	onKeyUp( event ) {
		
		const { enabled, enableKeys, keys, constraint } = this;
		
		if ( !enabled || !enableKeys) return;
		
		switch ( event.keyCode ) {
			
			case keys.Z:
				constraint.stopRotation('up');
				break;
			case keys.S:
				constraint.stopRotation('down');
				break;
			case keys.Q:
				constraint.stopRotation('left');
				break;
			case keys.D:
				constraint.stopRotation('right');
				break;
		}

	}
	
	onMouseWheel(event) {
		
		const { enabled, enableZoom, state, STATE, constraint, getZoomScale, dispatchEvent, events } = this;
		
		if (!enabled || !enableZoom || state !== STATE.NONE) return;
		
		event.preventDefault();
		event.stopPropagation();
		
		// WebKit / Opera / Explorer 9
		// Firefox
		const delta = event.wheelDelta ? event.wheelDelta : event.detail ? -event.detail : 0;
		
		if (delta > 0) constraint.dollyOut(getZoomScale());
		else if (delta < 0) constraint.dollyIn(getZoomScale());
		
		this.update();
		dispatchEvent(events.startEvent);
		dispatchEvent(events.endEvent);
		
	}
	
	contextmenu( event ) {
		event.preventDefault();
	}
	
	dispose() {
		this.domElement.removeEventListener( 'contextmenu', this.contextmenu, false );
		this.domElement.removeEventListener( 'mousewheel', this.onMouseWheel, false );
		this.domElement.removeEventListener( 'MozMousePixelScroll', this.onMouseWheel, false ); // firefox
		window.removeEventListener( 'keydown', this.onKeyDown, false );
		window.removeEventListener( 'keyup', this.onKeyUp, false );
	}
}
