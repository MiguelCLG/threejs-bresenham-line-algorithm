export function getMousePosition(canvas, evento) {
    let rect = canvas.getBoundingClientRect();

    return {
        x: evento.clientX - rect.left,
        y: rect.bottom - evento.clientY
    }
}

export function CreateInput(labelText, type, className, options)
{
    const input = document.createElement('input');
    const label = document.createElement('label');
    
    input.className = className;
    input.type = type;
    label.htmlFor = className;
    label.textContent = labelText;

    // se  temos o objecto options, adicionamos os atributos de acordo com a key
    // por exemplo, para um valor minimo no input teremos { min: 10 }
    if(options)
        Object.keys(options).forEach((key) => input.setAttribute(key, options[key]));
    return {label, input}
}
