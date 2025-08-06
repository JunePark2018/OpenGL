#version 140
#extension GL_ARB_compatibility: enable

uniform mat4 ModelMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ProjectionMatrix;

out vec3 pixelPosition;

void main() {
    pixelPosition = vec3(ModelMatrix * gl_Vertex);
    gl_Position = ProjectionMatrix * ViewMatrix * ModelMatrix * gl_Vertex;
}