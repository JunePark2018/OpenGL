#version 140
#extension GL_ARB_compatibility: enable

out vec4 color;

uniform mat4 ModelViewMatrix;
uniform mat4 ProjectionMatrix;

void main() 
{
   gl_Position = ProjectionMatrix * ModelViewMatrix * gl_Vertex;
   color = gl_Color;
}


