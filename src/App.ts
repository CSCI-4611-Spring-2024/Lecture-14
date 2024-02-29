/* Lecture 14: Mesh Morphing
 * CSCI 4611, Spring 2024, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class App extends gfx.GfxApp
{
    private cameraControls: gfx.OrbitControls;

    private character: gfx.Node3;

    // --- Create the App class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera);

        this.character = new gfx.Node3();
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        // Setup camera
        this.camera.setPerspectiveCamera(60, 1920/1080, .1, 20)
        this.cameraControls.setTargetPoint(new gfx.Vector3(0, 1, 0));
        this.cameraControls.setDistance(3);

        // Set a black background
        this.renderer.background.set(0, 0, 0);
        
        // Create an ambient light
        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.25, 0.25, 0.25));
        this.scene.add(ambientLight);

        // Create a point light
        const pointLight = new gfx.PointLight(new gfx.Color(1.25, 1.25, 1.25));
        pointLight.position.set(2, 1, 3)
        this.scene.add(pointLight);

        // Create the ground
        const ground = gfx.Geometry3Factory.createBox(5, 1, 5);
        ground.material.setColor(new gfx.Color(0, 0.5, 0.5));
        ground.position.y = -0.5;
        this.scene.add(ground);

        this.character.add(this.loadMorphMesh(
            './assets/LinkBody1.obj',
            './assets/LinkBody.png'
        ));

        this.character.add(this.loadMorphMesh(
            './assets/LinkEquipment1.obj',
            './assets/LinkEquipment.png'
        ));

        this.character.add(this.loadMorphMesh(
            './assets/LinkEyes1.obj',
            './assets/LinkEyes.png'
        ));

        this.character.add(this.loadMorphMesh(
            './assets/LinkFace1.obj',
            './assets/LinkSkin.png'
        ));

        this.character.add(this.loadMorphMesh(
            './assets/LinkHair1.obj',
            './assets/LinkBody.png'
        ));

        this.character.add(this.loadMorphMesh(
            './assets/LinkHands1.obj',
            './assets/LinkSkin.png'
        ));

        this.character.add(this.loadMorphMesh(
            './assets/LinkMouth1.obj',
            './assets/LinkBody.png'
        ));

        this.scene.add(this.character);
    }

    
    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        this.cameraControls.update(deltaTime);
    }

    private loadMorphMesh(meshFile: string, textureFile: string): gfx.Mesh3
    {
        const mesh = gfx.MeshLoader.loadOBJ(meshFile);

        const material = new gfx.GouraudMaterial();
        material.texture = new gfx.Texture(textureFile);
        mesh.material = material;

        return mesh;
    }
}