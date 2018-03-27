class Game {
    constructor() {
        this.Engine = matter.Engine;
        this.Events = matter.Events;
        this.Render = matter.Render;
        this.Runner = matter.Runner;
        this.MouseConstraint = matter.MouseConstraint;
        this.Mouse = matter.Mouse;
        this.World = matter.World;
        this.Bodies = matter.Bodies;
        this.Body = matter.Body;
        this.Vector = matter.Vector;
    }

    init(fieldObject) {
        if (this.engine) {
            return;
        }
        const style = window.getComputedStyle(fieldObject, null);
        const w = parseInt(style.width, 10);
        const h = parseInt(style.height, 10);
        this.field = {
            object: fieldObject,
            width: w,
            height: h,
            center: {
                x: w / 2,
                y: h / 2
            }
        }
        // create engine
        const engine = this.Engine.create({ enableSleeping: true });
        const world = this._createWorld(engine);
        // create renderer
        const renderer = this._createRenderer(engine);

        this._setWalls(world);
        // fit the render viewport to the scene
        this.Render.lookAt(renderer, {
            min: { x: 0, y: 0 },
            max: { x: w, y: h }
        });

        this.engine = engine;
        this.world = world;
        this.renderer = renderer;
        // create runner
        this.runner = this._createRunner();
        this.rotation = this._getRadian(45);
        this.block = null;
        // this.Events.on(this.engine, "collisionStart", (e) => {
        //     console.log(e);
        // });
    }

    render() {
        this.Render.run(this.renderer);
    }

    run() {
        this.runner.enabled = true;
        this.Runner.run(this.runner, this.engine);
        if (!this.block) {
            this._addBlock();
        }  
    }

    rotate() {
        this.Body.rotate(this.block, this.rotation);
    }

    go() {
        this.Body.set(this.block, { frictionAir: 0.01 });
    }

    stop() {
        this.Runner.stop(this.runner);
        this.runner.enabled = false;
    }

    reset() {
        this.Runner.stop(this.runner);
        this._clearWorld();
    }

    left() {
        this.Body.translate(this.block, this.Vector.create(-10));
    }

    right() {
        this.Body.translate(this.block, this.Vector.create(10));
    }

    _addBlock() {
        if (!this.runner.enabled) {
            return;
        }
        this.block = this._createBlock();
        this.Events.on(this.block, 'sleepStart', (e) => {
            if (this.block.isSleeping) {
                this.Events.off(this.block, 'sleepStart')
                this._addBlock();
            }
        });

        this.World.add(this.world, [
            // falling blocks
            this.block
        ]); 
    }

    _clearWorld() {
        this.World.clear(this.world, true);
    }

    _createWorld(engine) {
        return engine.world;
    }

    _createRenderer(engine) {
        // create renderer
        const renderer = this.Render.create({
            element: this.field.object,
            engine: engine,
            options: {
                width: this.field.width,
                height: this.field.height,
                showVelocity: true
            }
        });
        return renderer;
    }

    _createRunner() {
        return this.Runner.create({
            enabled: false
        });
    }

    _setWalls(world) {
        const w = this.field.width - 40;
        const h = this.field.height - 40;
        this.World.add(world, [
            // walls
            this.Bodies.rectangle(this.field.center.x, h, w, 20, { isStatic: true }),
        ]);
    }

    _setMouseConstraint(world, mouseConstraint) {
        this.World.add(world, mouseConstraint);
    }

    _createBlock() {
        const angle = this._getRadian(this._getRandomInt(0, 360));
        const w = this._getRandomInt(25, 50);
        const h = this._getRandomInt(25, 50);
        return this.Bodies.rectangle(this.field.center.x, 20, w, h, { angle, anglesleepThreshold: 60, frictionAir: 0.5 });
    }

    _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    _getRadian(degree) {
        return (degree * Math.PI) / 180;
    }
}

module.exports = Game;
