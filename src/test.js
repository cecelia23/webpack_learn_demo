import {file, parse} from './global';

function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['hello','webpack'],' ');

    // this.alert('hahahah');
    console.log(file);
    parse();

    return element;

}

document.body.appendChild(component());