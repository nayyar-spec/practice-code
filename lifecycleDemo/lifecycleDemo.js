import { LightningElement, track } from 'lwc';

export default class LifecycleDemo extends LightningElement {
    @track stage = 'Abhi shuruat hai...';

    // 1. CONSTRUCTOR
    // Requirement: Sabse pehle ye chalta hai.
    // Working: Yahan hum variables ko default value dete hain. 
    // Is stage par aap HTML ko touch nahi kar sakte (kyunki HTML abhi bana hi nahi).
    constructor() {
        super(); // super() likhna compulsory hai, varna error aayegi
        console.log('1. Constructor: Main paida ho gaya hoon!');
    }

    // 2. CONNECTEDCALLBACK
    // Requirement: Jab component ko pata chalta hai ki use screen par dikhna hai.
    // Working: API call karna ya server se shuruati data mangwane ke liye sabse best jagah hai.
    connectedCallback() {
        this.stage = 'Component Screen se connect ho gaya!';
        console.log('2. ConnectedCallback: Main screen par aane wala hoon.');
    }

    // 3. RENDEREDCALLBACK
    // Requirement: Jab HTML poori tarah se "Render" (dikhi) ho jaye.
    // Working: Agar aapko kisi third-party CSS ya Library (jaise Chart.js) ka use karna hai 
    // jo HTML banne ke baad hi kaam karti hai, toh yahan likhein.
    renderedCallback() {
        console.log('3. RenderedCallback: HTML dikh gayi hai.');
    }

    // 4. DISCONNECTEDCALLBACK
    // Requirement: Jab component ko screen se hataya jaye (Delete kiya jaye).
    // Working: Agar koi purana data saaf karna ho ya event listeners hatane ho.
    disconnectedCallback() {
        console.log('4. DisconnectedCallback: Tata Bye-Bye!');
    }
}