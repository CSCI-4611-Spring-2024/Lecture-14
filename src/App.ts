/* Lecture 14: Mesh Morphing
 * CSCI 4611, Spring 2024, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'
import { GUI } from 'dat.gui'

export class App extends gfx.GfxApp
{
    private cameraControls: gfx.OrbitControls;

    private character: gfx.Node3;
    public morphAlpha: number;

    // --- Create the App class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera);

        this.character = new gfx.Node3();
        this.morphAlpha = 0;
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
            './assets/LinkBody2.obj', 
            './assets/LinkBody.png'
        ));

        this.character.add(this.loadMorphMesh(
            './assets/LinkEquipment1.obj', 
            './assets/LinkEquipment2.obj', 
            './assets/LinkEquipment.png'
        ));

        this.character.add(this.loadMorphMesh(
            './assets/LinkEyes1.obj', 
            './assets/LinkEyes2.obj', 
            './assets/LinkEyes.png'
        ));

        this.character.add(this.loadMorphMesh(
            './assets/LinkFace1.obj', 
            './assets/LinkFace2.obj', 
            './assets/LinkSkin.png'
        ));

        this.character.add(this.loadMorphMesh(
            './assets/LinkHair1.obj', 
            './assets/LinkHair2.obj', 
            './assets/LinkBody.png'
        ));

        this.character.add(this.loadMorphMesh(
            './assets/LinkHands1.obj', 
            './assets/LinkHands2.obj', 
            './assets/LinkSkin.png'
        ));

        this.character.add(this.loadMorphMesh(
            './assets/LinkMouth1.obj', 
            './assets/LinkMouth2.obj', 
            './assets/LinkBody.png'
        ));

        this.scene.add(this.character);

        // Create a simple GUI
        const gui = new GUI();
        gui.width = 200;

        const morphController = gui.add(this, 'morphAlpha', 0, 1);
        morphController.name('Alpha');
    }

    
    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        this.cameraControls.update(deltaTime);

        for(let i=0; i < this.character.children.length; i++)
        {
            const morphMesh = this.character.children[i] as gfx.MorphMesh3;
            morphMesh.morphAlpha = this.morphAlpha;
        }
    }

    private loadMorphMesh(meshFile1: string, meshFile2: string, textureFile: string): gfx.MorphMesh3
    {
        // Create morph mesh
        const morphMesh = new gfx.MorphMesh3();

        gfx.MeshLoader.loadOBJ(meshFile1, (loadedMesh: gfx.Mesh3) => {
            morphMesh.positionBuffer = loadedMesh.positionBuffer;
            morphMesh.normalBuffer = loadedMesh.normalBuffer;
            morphMesh.texCoordBuffer = loadedMesh.texCoordBuffer;
            morphMesh.indexBuffer = loadedMesh.indexBuffer;
            morphMesh.vertexCount = loadedMesh.vertexCount;
            morphMesh.triangleCount = loadedMesh.triangleCount;
        });

        gfx.MeshLoader.loadOBJ(meshFile2, (loadedMesh: gfx.Mesh3) => {
            morphMesh.morphTargetPositionBuffer = loadedMesh.positionBuffer;
            morphMesh.morphTargetNormalBuffer = loadedMesh.normalBuffer;
        });

        // Load the texture and assign it to the material
        morphMesh.material.texture = new gfx.Texture(textureFile);

        return morphMesh;
    }
}