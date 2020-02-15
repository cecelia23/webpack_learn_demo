// import _ from 'lodash';
import './style.css';
// import MyImage from './icon.jpg';
// import myPrint from './print';
import {cube} from './math';


// 去掉import外壳即为静态加载
// function component() {
//     // 动态加载
//     // return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
//         let element = document.createElement('div');

//         element.innerHTML = _.join(['hello','webpack,', cube(5)],' ');
//         element.classList.add('hello');
    
//         // var myIcon = new Image();
//         // myIcon.src = MyImage;
//         // element.appendChild(myIcon);
    
//         let button = document.createElement('button');
//         button.innerHTML = 'click me and check the console!';
    
//         button.onclick = myPrint;
    
//         element.appendChild(button);
    
//         return element;
//     // }).catch(err => 'an error occured while loading the component');

// }

// 静态加载
// var element = component(); //改用一个element保存一下
// document.body.appendChild(element);
// if (module.hot) { //告诉 webpack 接受热替换的模块
//     module.hot.accept('./print.js', () => {
//         console.log('Accepting the updated printMe module!');
//         document.body.removeChild(element); //删掉旧的element
//         element = component(); //重新渲染页面后，component 更新 click 事件处理
//         document.body.appendChild(element); //重新插入到网页中
//     })
// }


// async 动态加载
async function component() {
    let element = document.createElement('div');

    let button = document.createElement('button');
    button.innerHTML = 'click me and check the console!';    
    // 懒加载
    button.onclick = e => import(/* webpackChunkName: "print" */ './print.js').then(module => {
        const print = module.default;
        print();
    })
        
    element.appendChild(button);
    return element;
}


// 动态加载
component().then(element => {
    document.body.appendChild(element);
    if (module.hot) { //告诉 webpack 接受热替换的模块
        module.hot.accept('./print.js', () => {
            console.log('Accepting the updated printMe module!');
            console.log('update in issue-2');
            document.body.removeChild(element); //删掉旧的element
            element = component(); //重新渲染页面后，component 更新 click 事件处理
            document.body.appendChild(element); //重新插入到网页中
        })
    }
})


 if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
        }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
        });
    });
}