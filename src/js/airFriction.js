class AirFriction {
    constructor() {
        this.Engine = matter.Engine;
        this.Render = matter.Render;
        this.Runner = matter.Runner;
        this.MouseConstraint = matter.MouseConstraint;
        this.Mouse = matter.Mouse;
        this.World = matter.World;
        this.Bodies = matter.Bodies;
    }

    prepare() {
        // create engine
        const engine = this.Engine.create();
        const world = engine.world;
        // create renderer
        const render = this.Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: 800,
                height: 600,
                showVelocity: true
            }
        });

        // add bodies
        this.World.add(world, [
            // falling blocks
            this.Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }),
            this.Bodies.rectangle(400, 100, 60, 60, { frictionAir: 0.05 }),
            this.Bodies.rectangle(600, 100, 60, 60, { frictionAir: 0.1 }),

            // walls
            this.Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
            this.Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            this.Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
            this.Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
        ]);

        // add mouse control
        const mouse = this.Mouse.create(render.canvas);
        const mouseConstraint = this.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        this.World.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // fit the render viewport to the scene
        this.Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 600 }
        });

        this.Render.run(render);
        // create runner
        const runner = this.Runner.create();
        this.Runner.run(runner, engine);    
    }

    // run() {
    //     this.Render.run(render);
    //     // create runner
    //     const runner = this.Runner.create();
    //     this.Runner.run(runner, engine);    
    // }

    stop() {

    }
}

module.exports = AirFriction;
