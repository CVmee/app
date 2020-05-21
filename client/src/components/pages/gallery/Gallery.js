import React, { Component } from 'react'
import Navigation from '../../ui/navbar/Navbar'

import escapeHtml from 'escape-html'
import { Node, Text } from 'slate'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';






class Gallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: []
        }
    }


    exampleDescription = [
        {
            "type": "paragraph",
            "children":
                [
                    { "text": "This is editable " },
                    { "text": "rich", "bold": true },
                    { "text": " text, " },
                    { "text": "much", "italic": true },
                    { "text": " better than a normal text !" }
                ]
        },
        {
            "type": "paragraph",
            "children":
                [
                    { "text": "Since it's rich text, you can do " },
                    { "text": "thing", "bold": true },
                    { "text": "s like turn a selection of text " },
                    { "text": "bold", "bold": true },
                    { "text": ", or add a semantically rendered block quote in the middle of the page, like this:" }
                ]
        },
        {
            "type": "paragraph",
            "children":
                [{ "text": "Try it out for yourself!sdjfgndfjgkdfsgjkldsfmg" }]
        },
        {
            "type": "paragraph",
            "children": [{ "text": "" }]
        },
        {
            "type": "bulleted-list",
            "children":
                [
                    {
                        "type": "list-item",
                        "children": [{ "text": "dfsgsdfgsdfg" }]
                    },
                    {
                        "type": "list-item",
                        "children": [{ "text": "dsfgsdfgsdfgjjj" }]
                    },
                    {
                        "type": "list-item",
                        "children": [{ "text": "dfsgsdfgdfsg" }]
                    },
                    { "type": "list-item", "children": [{ "text": "dsfg" }] },
                    { "type": "list-item", "children": [{ "text": "dsfgsdfg" }] },
                    { "type": "list-item", "children": [{ "text": "sdfgsdfg" }] },
                    { "type": "list-item", "children": [{ "text": "dsfgsdg" }] },
                    { "type": "list-item", "children": [{ "text": "" }] },
                    { "type": "list-item", "children": [{ "text": "" }] }]
        },
        { "type": "paragraph", "children": [{ "text": "sdfgsdfgsdfgsdfg" }] },
        { "type": "paragraph", "children": [{ "text": "dfgdfsg" }] },
        { "type": "paragraph", "children": [{ "text": "" }] }
    ]


    serialize = node => {
        if (Text.isText(node)) {
            return escapeHtml(node.text)
        }

        const children = node.children.map(n => this.serialize(n)).join('')

        switch (node.type) {
            case 'paragraph':
                return `<p>${children}</p>`
            case 'bold':
                return `<strong>${children}</strong>`
            case 'italic':
                return `<em>${children}</em>`
            case 'bulleted-list':
                return `<ul>${children}</ul>`
            case 'list-item':
                return `<li>${children}</li>`
            case 'link':
                return `<a href="${escapeHtml(node.url)}">${children}</a>`
            default:
                return children
        }
    }

    componentDidMount = () => this.exampleDescription.map(node => this.state.content.push(this.serialize(node)))



    render() {

        this.exampleDescription.map(node => console.log(node))


        return (
            <>
                <h1>Gallery</h1>
                <div>{this.exampleDescription.map(node => this.serialize(node))}</div>
                <hr></hr>
                {this.exampleDescription.map(node => { ReactHtmlParser(this.serialize(node)) })}
                {this.state.content.length > 0 && this.exampleDescription.map(node => <> {ReactHtmlParser(node)}</>)}
                {this.state.content.length > 0 && this.state.content.map(node => <> {ReactHtmlParser(node)}</>)}

            </>
        )
    }
}




export default Gallery