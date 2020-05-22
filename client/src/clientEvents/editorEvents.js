const formWrapper = (index, type) => {
    const form = document.querySelector(`#${type}-form-${index}`)
    form.classList.toggle('show')
}

const mouseEnterFormItem = (index, type) => {
    const sideElements = document.querySelectorAll(`#drag-${type}-button-${index},#delete-${type}-item-button-${index}`)
    const titleElement = document.querySelector(`#form-${type}-item-title-${index}`)
    sideElements.forEach(element => element.classList.add('showing'))
    titleElement.classList.add('hovered')
}

const mouseLeaveFormItem = (index, type) => {
    const sideElements = document.querySelectorAll(`#drag-${type}-button-${index}, #delete-${type}-item-button-${index}`)
    const titleElement = document.querySelector(`#form-${type}-item-title-${index}`)
    sideElements.forEach(element => element.classList.remove('showing'))
    titleElement.classList.remove('hovered')
}

const mouseEnterDeleteButton = (index, type) => document.querySelector(`#delete-${type}-item-button-${index}`).classList.add('hovered')

const mouseLeaveDeleteButton = (index, type) => document.querySelector(`#delete-${type}-item-button-${index}`).classList.remove('hovered')

const mouseEnterAddButton = (type) => document.querySelector(`#add-${type}-button`).classList.add('hovered')

const mouseLeaveAddButton = (type) => document.querySelector(`#add-${type}-button`).classList.remove('hovered')

const mouseEnterEditorVisualizer = () => {
    document.querySelector('#zoom-out-editor-icon').classList.add('show')
    document.querySelector('#zoom-out-editor-icon-container').classList.add('show')
}
const mouseLeaveEditorVisualizer = () => {
    document.querySelector('#zoom-out-editor-icon').classList.remove('show')
    document.querySelector('#zoom-out-editor-icon-container').classList.remove('show')
}

export {
    mouseEnterFormItem,
    mouseLeaveFormItem,
    formWrapper,
    mouseEnterDeleteButton,
    mouseLeaveDeleteButton,
    mouseEnterAddButton,
    mouseLeaveAddButton,
    mouseEnterEditorVisualizer,
    mouseLeaveEditorVisualizer,
}
//