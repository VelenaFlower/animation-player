# CodeJam Animation Player   

https://velenaflower.github.io/animation-player/

## Task
Your task is to implement Animation Player with `Frames` and `Preview` components and the functionalities described below. 
This task is the continuation of the [CodeJam Pallete](./codejam-pallete.md) and should help with starting piskel clone work.

## Requirements
### Mock ups / UI prototype
* [Figma online](https://www.figma.com/proto/hieu0x13Znk8pzwej9oTrK/animation-player?node-id=1%3A2&scaling=min-zoom)
* Fig file [link](https://www.dropbox.com/s/g4tyu5u9gfk7jx9/animation%20player.fig?dl=0)
* [piskel](https://www.piskelapp.com/) should be used as reference

### Functionality

#### `Frames` component
- Ability to add a frame
- Ability to delete a frame
- Ability to duplicate a frame

#### `Preview` component
- Ability to animate the created frames  
- Ability to change FPS rate from 1 to 24 per second
- Ability to run the animation in Full screen mode

### Functional requirements
- drawing field for creating separate frames for animation
  - could be reused from palette codejam (be 3x3 field on div)
  - it's possible to use field with size 4x4 or even more 
  - it is also possible to use canvas api to draw and interact with frame content
- preview component should use 
  - canvas api for animation
  - or use the method from piskel app (change background image with frame rate)
- Please use `Frames` and `Preview` components of https://www.piskelapp.com/ as an ideal example of what should be done.
- Should work in Chrome
