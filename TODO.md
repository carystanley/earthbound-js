## TO DO

### Clean Up

* Loading the map should be separated out, so that we can load a new map without reseting the "state"
* Add "delegate" to Menu state
* Add Class System

### Development

* CutScene SubState with Interpreter
* Party
* Inventory
* Character Walking AI


- [ ] Setup CutScene SubState
- [ ] Inventory
- [ ] Menu System
    - [ ] Menu
    - [ ] MenuItem
- [ ] Overworld Enemy Entity
    - [ ] Overworld Chase AI
    - [ ] Overworld Wander AI
- [ ] Battle System
    - [ ] Attack Order
    - [ ] Actions
    - [ ] Party
- [ ] Dialog Choice System
- [ ] Stats
- [ ] X

### stage

* Phaser.Stage
   * Phaser.World
      * Phaser.TilemapLayer
      * Phaser.TilemapLayer
      * Phaser.Graphics
      * PlayerGroup
      * Phaser.Group (Enemy x 2)
      * Phaser.Group (Spawn x 2)
      * Phaser.Group (BattleBackgroundLine x 112)
      * t
      * t
      * t
      * t
   * Phaser.Graphics ?
   * Phaser.Image ?

### Webpack 3/3/2017

```
ES6 Babel:

-rw-r--r--  1 cary  staff   155428 Jan 30 16:38 app.min.js
-rw-r--r--  1 cary  staff     4959 Jan 24 14:13 nine-patch-phaser-plugin.min.js
-rw-r--r--  1 cary  staff    51213 Jan 24 14:14 phaser-arcade-slopes.min.js
-rw-r--r--  1 cary  staff  2510990 Jan 30 16:38 phaser.js
-rw-r--r--  1 cary  staff     2260 Jan 24 14:14 stats.min.js

w/o Babel

-rw-r--r--  1 cary  staff   24406 Mar  3 16:08 app.min.js
-rw-r--r--  1 cary  staff    4959 Jan 24 14:13 nine-patch-phaser-plugin.min.js
-rw-r--r--  1 cary  staff   51213 Jan 24 14:14 phaser-arcade-slopes.min.js
-rw-r--r--  1 cary  staff  597525 Mar  3 16:08 phaser.js
-rw-r--r--  1 cary  staff    2260 Jan 24 14:14 stats.min.js
```
