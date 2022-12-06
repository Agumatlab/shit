import './css/languagemenu.css'
import './css/darkmode.css'
import './css/style.css'
import './css/page1.css'
import './css/page2.css'
import './css/page3.css'
import './css/page4.css'
import './css/page5.css'
import './css/page6.css'
import './css/page7.css'
import './css/page8.css'
import './css/page9.css'
import './css/navigationmenu.css'

import './css/signin.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { randFloat } from 'three/src/math/MathUtils'


if (document.querySelector('body').id=="body-home"){

// ------------BEGIN OF FAVOURITE THEME COLOR
    const colorThemes = document.querySelectorAll('[name="theme"]');

    // store theme
    const storeTheme = function (theme) {
    localStorage.setItem("theme", theme);
    };

    // set theme when visitor returns
    const setTheme = function () {
    const activeTheme = localStorage.getItem("theme");
    colorThemes.forEach((themeOption) => {
        if (themeOption.id === activeTheme) {
        themeOption.checked = true;
        }
    });
    // fallback for no ':has()' support
    document.documentElement.className = activeTheme;
    };

    colorThemes.forEach((themeOption) => {
    themeOption.addEventListener("click", () => {
        storeTheme(themeOption.id);
        // fallback for no :has() support
        document.documentElement.className = themeOption.id;
    });
    });

    document.onload = setTheme();
// END----------------------------------------



// ---------------------------------------MENU
var icons = document.querySelectorAll('.list');
    
icons.forEach((item) => 
    item.addEventListener("click", function (){
    if (item.classList.contains('active')){
        item.classList.remove('active')
    } else {
        item.classList.add('active')
        if (item.id=="navmoveup"){ item.classList.remove('active')}
    }
    })
)
// END------------------------------------------




// --------------------MAKE ALL APPEAR ON SCROLL
const content = document.querySelectorAll('main>div')
    
const appearOnScroll = function(){
    
    var y=window.scrollY;
    content.forEach( (elem) =>{
    var top = elem.getBoundingClientRect().top + document.documentElement.scrollTop
    var bot = elem.getBoundingClientRect().bottom + document.documentElement.scrollTop
    
    // console.log(r(y),top,bot)
    if ( y+500>=top ){  //y>=top
        // elem.style.opacity = 1
        elem.classList.add('on-view');
    } 
    // else{
    //     // elem.style.opacity = .2
    //     elem.classList.remove('on-view');
    // } 
})
};

window.addEventListener("scroll", appearOnScroll)
window.addEventListener("load", appearOnScroll)
// END------------------------------------------




// ------------4AGER FOUNDERS ROTATION ANIMATION
const ritmo = 6000;
const changeFounder = function(){
    var actualfounder = document.querySelector('#founders input:checked')
    var nextfounder = document.querySelector('#founders input:checked+input')
    if (!nextfounder){nextfounder=document.querySelector('#founders #f1')}
    actualfounder.checked=false;
    nextfounder.checked=true;
};
var founderPeriod = setInterval(changeFounder,ritmo)

const founders = document.querySelectorAll('#founders input')
founders.forEach( (f)=> {f.addEventListener('click',function(){
    clearInterval(founderPeriod)
    founderPeriod = setInterval(changeFounder,ritmo);
    })
})
// END------------------------------------------



// Scene first-to-see
const scene = new THREE.Scene()
const canvas = document.querySelector('canvas.webgl')

// Scene sat-focus
const satscene = new THREE.Scene();
const satfocus = document.querySelectorAll('.p7ico')

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const light = new THREE.AmbientLight( 0xFFFFFF,0.95 ); // soft white light
light.position.set(0,20,5)
scene.add( light )

const satlight = new THREE.AmbientLight(0xFFFFFF,1);
satlight.position.set(5,5,5)
satscene.add(satlight)

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader)
var sat1,sat2,terra, satA, red1, red2;

loader.load( 'models/MyGMaps/Satellite.glb', function ( gltf ) {
    
	red1 = new THREE.SpotLight( 0x110000, 1e10, 100, Math.PI/80 ,0,0);
    red2 = new THREE.SpotLight( 0x110000, 1e10, 100, Math.PI/80 ,0,0);
    

    sat1 = gltf.scene.children[0]
    sat2 = gltf.scene.clone()

    satA = gltf.scene.clone()
    satA.position.set(0,0,0)

    sat1.add(red1)
    sat2.add(red2)

    scene.add(sat1)
    scene.add(sat2)
    
    satscene.add(satA)

    }, undefined, function ( error ) { console.error( error ); } 
);


loader.load( 'models/MyGMaps/terra.glb', function ( gltf ) {
    
	scene.add( gltf.scene );
    terra=gltf.scene.children[0]
    // terra.metalness = 0;
    // terra.roughness = 1;
    }, undefined, function ( error ) { console.error( error ); } 
);

// Sizes
const sizes = {   width: 800,    height: 600}

// Camera
const camera = new THREE.OrthographicCamera(-15,15,15,-15,-50,50)
camera.position.set(3,3,3)
scene.add(camera)

const satcam = new THREE.OrthographicCamera(-3,3,3,-3,-8,8)
satcam.position.set(1,1,1)
satcam.lookAt(0,0,0)
satscene.add(satcam)

const controls = new OrbitControls(camera, canvas)
const pi=Math.PI

controls.enablePan = false;
controls.target.set(0, 1, 0)
controls.maxZoom = 10;
controls.minZoom = 1;

controls.maxPolarAngle = pi/2;
controls.minPolarAngle = 0;
controls.enableDamping = true;
controls.autoRotateSpeed = .1
controls.update()

const satcontrols = [,,];
for (let i=0;i<3;i++){
    satcontrols[i] = new OrbitControls(satcam, satfocus[i])
    satcontrols[i].enablePan = false;
    satcontrols[i].maxZoom = 1;
    satcontrols[i].minZoom = .5;    
    satcontrols[i].target.set(0, 0, 0)
    satcontrols[i].autoRotateSpeed = .1;
    satcontrols[i].autoRotate = true;
    satcontrols[i].update()
}
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)  // VA PER ULTIMO!!!
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const satrender=[,,];
for (let i=0;i<3;i++){
    satrender[i] = new THREE.WebGLRenderer({ canvas: satfocus[i], alpha: true})
    satrender[i].setSize(400,400)
    satrender[i].render(satscene, satcam)  // VA PER ULTIMO!!!
    satrender[i].setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

const clock = new THREE.Clock()
let previousTime = 0

var ang = 0, aa=0, bb=0, ii=0, AA = 0, BB=0, dA=0, dB=0, H=3;
const r=10, h=9, pace=200;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Model animation 
    // empty for now
 
    controls.autoRotate = (controls.getPolarAngle() >1)? true : false;

    // Update controls
    controls.update()
    renderer.render(scene, camera)
    
    satcontrols.forEach( (sc) => sc.update())
    satrender.forEach( (sr) => sr.render(satscene, satcam))
    
    if (sat1){
    ang += .001
    AA+=dA;
    BB+=dB;
    sat1.position.set(r*Math.cos(ang),   h+2*Math.sin(ang),r*Math.sin(ang)   )
    sat2.position.set(r*Math.cos(ang+pi),h+2*Math.sin(ang+pi),r*Math.sin(ang+pi))
    
    sat1.rotation.set(0+AA,-ang,   -150/180*pi-BB)
    sat2.rotation.set(0+AA,-ang+pi,-150/180*pi-BB)
    
    red1.position.set(sat1.position.x,sat1.position.y,sat1.position.z)
    red2.position.set(sat2.position.x,sat2.position.y,sat2.position.z)


    ii = ii > pace ? 0 : ii+1;
    if (ii==pace){

        // red1.target.position.set( Math.random(),1,Math.random())
        // red2.target.position.set( Math.random(),1,Math.random())
    
        red1.lookAt( randFloat(-H,H),randFloat(-H,H),1)
        red2.lookAt( randFloat(-H,H),randFloat(-H,H),1)
    
        aa = randFloat(-0.5,0.5)*40/180*pi;
        bb = randFloat(-0.7,0.3)*40/180*pi;        
        
        dA = (aa-AA)/pace;
        dB = (bb-BB)/pace;   
    }
      
    }

    if (satA){
        satA.rotation.set(0,0,Math.sin(ang*5)*25/180*pi);
    }
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



// SPOSTA LA ZOLLA A LATO durante la story e FAI APPARIRE I CAPITOLI---------
if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype) 
{
    let restoreInTheEnd = new IntersectionObserver(entries => {
        entries[0].isIntersecting? canvasMain.classList.remove("not-at-top") : canvasMain.classList.add("not-at-top");
    });
    
    let moveToRight = new IntersectionObserver(entries => {
    entries[0].isIntersecting? canvasMain.classList.remove("not-at-top") : canvasMain.classList.add("not-at-top");
    });
    
  moveToRight.observe( welcome );
  restoreInTheEnd.observe( document.getElementById('p9') );
}
// FINE-----------------------------------------------------------------------

} else if (document.querySelector('body').id=="body-sign"){

/* const rmCheck = document.getElementById("rememberMe"),
// emailInput = document.getElementById("email");

// if (localStorage.checkbox && localStorage.checkbox !== "") {
//   rmCheck.setAttribute("checked", "checked");
//   emailInput.value = localStorage.username;
// } else {
//   rmCheck.removeAttribute("checked");
//   emailInput.value = "";
// }

// function lsRememberMe() {
//   if (rmCheck.checked && emailInput.value !== "") {
//     localStorage.username = emailInput.value;
//     localStorage.checkbox = rmCheck.value;
//   } else {
//     localStorage.username = "";
//     localStorage.checkbox = "";
//   }
// } */

}




/* SLIDER CHE SI SPOSTA A MANO--------------------------------------- */
// var mousePosition;
// var isDown=false;

// var half = document.getElementById("half");
//     half.style.width= '10px';
// var edge = document.getElementById("edge");
// edge.addEventListener('mousedown', function(e) { isDown = true;  }, true);
// document.addEventListener('mouseup', function() { isDown = false; }, true);
// document.addEventListener('mousemove', function(event) {
//     event.preventDefault();
//     if (isDown) {
//         mousePosition = {
//             x : event.clientX,
//             y : event.clientY };
//         half.style.width = mousePosition.x+'px';   
//     }}, true);

// FINE






