class Game {
    constructor() {
        this.Engine = matter.Engine;
        this.Render = matter.Render;
        this.Runner = matter.Runner;
        this.MouseConstraint = matter.MouseConstraint;
        this.Mouse = matter.Mouse;
        this.World = matter.World;
        this.Bodies = matter.Bodies;
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
            height: h
        }
        // create engine
        const engine = this.Engine.create();
        const world = this._createWorld(engine);
        // create renderer
        const renderer = this._createRenderer(engine);
        // add mouse control
        const mouse = this._createMouse(renderer.canvas);
        // keep the mouse in sync with rendering
        renderer.mouse = mouse;
        const mouseConstraint = this._createMouseConstraint(engine, mouse);

        this._setWalls(world);
        this._setMouseConstraint(world, mouseConstraint);

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
    }

    render() {
        this.Render.run(this.renderer);
    }

    run() {
        this.Runner.run(this.runner, this.engine);    
    }

    stop() {
        this.Render.stop(this.renderer);
        this.Runner.stop(this.runner);
    }

    addBlock() {
        this.World.add(this.world, [
            // falling blocks
            this.Bodies.rectangle(150, 100, 60, 60, { frictionAir: 0.05 }),
        ]); 
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

    _createMouse(canvas) {
        return this.Mouse.create(canvas);
    }

    _createMouseConstraint(engine, mouse) {
        const mc = this.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        return mc;
    }

    _createRunner() {
        return this.Runner.create();
    }

    _setWalls(world) {
        const w = this.field.width;
        const h = this.field.height;
        this.World.add(world, [
            // walls
            this.Bodies.rectangle(0, 0, 600, 20, { isStatic: true }),
            this.Bodies.rectangle((w - 20), 0, 20, h, { isStatic: true }),
            this.Bodies.rectangle(0, h, w, 20, { isStatic: true }),
            this.Bodies.rectangle(0, 0, 20, h, { isStatic: true })
        ]);
    }

    _setMouseConstraint(world, mouseConstraint) {
        this.World.add(world, mouseConstraint);
    }
}

module.exports = Game;
