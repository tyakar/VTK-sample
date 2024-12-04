import '@kitware/vtk.js/favicon';

// // Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkOpenGLRenderWindow from '@kitware/vtk.js/Rendering/OpenGL/RenderWindow';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';
import vtkInteractorStyleTrackballCamera from '@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera';
import { useEffect, useRef } from 'react';
import vtkCubeSource from '@kitware/vtk.js/Filters/Sources/CubeSource';
import sampleData from './sample-box.json';

const BlockModelViewer = ({fileName, query}) => {
    const elementRef = useRef();


    useEffect(() => {
        const renderWindow = vtkRenderWindow.newInstance();
        const renderer = vtkRenderer.newInstance({ background: [0.2, 0.3, 0.4] });
        renderWindow.addRenderer(renderer);

        let aa = sampleData;
        console.log(aa.length);
        const objectCount = 2000;

        for (let r = 0; r < objectCount; r++) {
            // for (let c = 0; c < objectCount; c++) {

            let obj = sampleData [r];
                const cubeSource = vtkCubeSource.newInstance({});
                const actor = vtkActor.newInstance();
                const mapper = vtkMapper.newInstance();

                actor.setMapper(mapper);
                // actor.setPosition(0.0, 0.0, 0.0);
                // Setting PBR values
                
                actor.setPosition(parseFloat(obj.EAST), parseFloat(obj.NORTH), parseFloat(obj.ELEV));

                mapper.setInputConnection(cubeSource.getOutputPort());

                // actor.getProperty().setDiffuseColor(0.2 + c * 0.1, 0.5, 0.2 + 0.1 * r);

                renderer.addActor(actor);
            // }
        }

        // ----------------------------------------------------------------------------
        // Simple pipeline ConeSource --> Mapper --> Actor
        // ----------------------------------------------------------------------------

        // const coneSource = vtkConeSource.newInstance({height: 1.0 });
        // const coneSource = vtkCylinderSource.newInstance({ height: 1.0 });
        // const coneSource = vtkSphereSource.newInstance({ height: 1.0 });
        // const coneSource = vtkPlaneSource.newInstance({ height: 1.0 });



        // const mapper = vtkMapper.newInstance();
        // mapper.setInputConnection(coneSource.getOutputPort());

        // const actor = vtkActor.newInstance();
        // actor.setMapper(mapper);
        // ----------------------------------------------------------------------------
        // Add the actor to the renderer and set the camera based on it
        // ----------------------------------------------------------------------------

        // renderer.addActor(actor);
        renderer.resetCamera();

        // ----------------------------------------------------------------------------
        // Use OpenGL as the backend to view the all this
        // ----------------------------------------------------------------------------

        const openGLRenderWindow = vtkOpenGLRenderWindow.newInstance();
        renderWindow.addView(openGLRenderWindow);

        // ----------------------------------------------------------------------------
        // Create a div section to put this into
        // ----------------------------------------------------------------------------

        const container = elementRef.current;
        // document.querySelector('body').appendChild(container);
        openGLRenderWindow.setContainer(container);

        // ----------------------------------------------------------------------------
        // Capture size of the container and set it to the renderWindow
        // ----------------------------------------------------------------------------

        const { width, height } = container.getBoundingClientRect();
        openGLRenderWindow.setSize(width, height);

        // ----------------------------------------------------------------------------
        // Setup an interactor to handle mouse events
        // ----------------------------------------------------------------------------

        const interactor = vtkRenderWindowInteractor.newInstance();
        interactor.setView(openGLRenderWindow);
        interactor.initialize();
        interactor.bindEvents(container);

        // ----------------------------------------------------------------------------
        // Setup interactor style to use
        // ----------------------------------------------------------------------------

        interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());

    }, []);
    return (
        <div ref={elementRef}>

        </div>
    );
}

export default BlockModelViewer;