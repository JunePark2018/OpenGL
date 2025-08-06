#version 140
#extension GL_ARB_compatibility: enable

out vec3 fPos;
out vec3 normal;

uniform mat4 ModelMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ProjectionMatrix;

uniform float thickness;
uniform vec3 eye;

attribute vec3 aPos;
attribute vec3 aNormal;

void main() 
{
    fPos = vec3(ModelMatrix * vec4(aPos, 1.0));
    normal = mat3(transpose(inverse(ModelMatrix))) * aNormal;
	
    gl_Position = ProjectionMatrix * ViewMatrix * ModelMatrix * vec4(aPos + aNormal * thickness, 1.0);
}