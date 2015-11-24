import _ from 'three';

export default () => new _.ShaderMaterial({
	uniforms: { 
		coeficient: {
			type: "f", 
			value: 1.0
		},
		power: {
			type: "f",
			value: 2
		},
		glowColor: {
			type: "c",
			value: new _.Color('pink')
		},
	},
	vertexShader: [
		'varying vec3	vVertexWorldPosition;',
		'varying vec3	vVertexNormal;',
		'void main(){',
		'	vVertexNormal	= normalize(normalMatrix * normal);',
		'	vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;',
		'	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
		'}',
	].join('\n'),
	fragmentShader: [
    'uniform vec3	glowColor;',
    'uniform float coeficient;',
    'uniform float power;',
    'varying vec3	vVertexNormal;',
    'varying vec3	vVertexWorldPosition;',
    'void main(){',
    '	vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;',
    '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',
    '	viewCameraToVertex = normalize(viewCameraToVertex);',
    '	float intensity = pow(abs(coeficient + dot(vVertexNormal, viewCameraToVertex)), power);',
    '	gl_FragColor = vec4(glowColor, intensity);',
    '}',
  ].join('\n'),
	transparent: true,
	depthWrite: false,
});
