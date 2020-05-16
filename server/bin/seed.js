require('dotenv').config()

const mongoose = require('mongoose')
const User = require('../models/user.model')
const Employment = require('../models/employment.model')
const Education = require('../models/education.model')
const Link = require('../models/link.model')
const CV = require('../models/cv.model')
const Template = require('../models/template.model')
const Description = require('../models/description.model')

//mongoose.connect(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASSWORD}@damagesound-t1udi.gcp.mongodb.net/${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(`mongodb://localhost/${process.env.LOCALDB}`, { useNewUrlParser: true, useUnifiedTopology: true })


const bcrypt = require("bcrypt")
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)


const exampleDescription = [
    {
        "type": "paragraph",
        "children":
            [
                {
                    "text": "This is editable "
                },
                {
                    "text": "rich",
                    "bold": true
                },
                {
                    "text": " text, "
                },
                {
                    "text": "much",
                    "italic": true
                },
                {
                    "text": " better than a normal text !"
                }
            ]
    },
    {
        "type": "paragraph",
        "children":
            [
                {
                    "text": "Since it's rich text, you can do "
                },
                {
                    "text": "thing",
                    "bold": true
                },
                {
                    "text": "s like turn a selection of text "
                },
                {
                    "text": "bold", "bold": true
                },
                {
                    "text": ", or add a semantically rendered block quote in the middle of the page, like this:"
                }
            ]
    },
    {
        "type": "paragraph",
        "children":
            [
                {
                    "text": "Try it out for yourself!sdjfgndfjgkdfsgjkldsfmg"
                }
            ]
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
                    "children": [
                        {
                            "text": "dsfgsdfgsdfgjjj"
                        }
                    ]
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

const lulu = { description: exampleDescription }

const users = [
    {
        firstName: "Gerardo",
        lastName: "Toledo",
        title: "Software Developer",
        email: "a@a.com",
        password: bcrypt.hashSync('pass1', salt),
        phone: "123456789",
        profilePicture: "https://qph.fs.quoracdn.net/main-qimg-134e3bf89fff27bf56bdbd04e7dbaedf.webp",
        //profileDescription: "Experienced and dedicated Federal Government HR Manager with over ten years of experience, ensure HR systems support agencies in recruiting, hiring and retaining an excellent and diverse workforce. Adept at providing optimal support to executives and officials in need. Committed to integrity and constantly securing the privacy of identities and documents. Bringing forth a proven track record of facilitating excellent workflow in HR departments.",
        profileDescription: exampleDescription ,
        // profileDescription: { description: exampleDescription },
        // profileDescription: [{sup: "sop", sip: "sap"}, {yo: "yo", lo: "la"}],
        // profileDescription: { description: [{ sup: "sop", sip: "sap" }, { yo: "yo", lo: "la" }]}
    },
    {
        firstName: "Demo 1",
        lastName: "Demo 2",
        title: "Yoga Instructor",
        email: "b@b.com",
        password: bcrypt.hashSync('pass2', salt),
        phone: "987654321",
        profilePicture: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.nelsonirrigation.com%2Fmedia%2Fpeople%2F%3FC%3DD%3BO%3DD&psig=AOvVaw2UHc769pta1clyVHKolHF6&ust=1589280988466000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIj2zZvTq-kCFQAAAAAdAAAAABAi",
        //profileDescription: "Experienced and passionate Yoga Instructor with over five years of teaching experience and advanced training in Ashtanga and Vinyasa approaches. Committed to providing extensive instruction and counseling to my clients, while motivating them to find true inner peace and their healthiest self. Adept in creating powerful teaching plans that aim to support and benefit each and every student. Bringing forth a love and respect for the art of yoga, and all that it encompasses. "
        //profileDescription: { description: exampleDescription }

    },
]

const cvs = []

const createCVs = (user) => {

    cvs.push(
        {
            name: 'Apollo',
            employment: employment,
            education: education,
            skills: skills,
            links: links,
            userInfo: {
                firstName: user.firstName,
                lastName: user.lastName,
                title: user.title,
                email: user.email,
                phone: user.phone,
                profilePicture: user.profilePicture,
                profileDescription: user.profileDescription
            },
            user: user.id
        },
        {
            name: "Poseidon",
            employment: employment,
            education: education,
            skills: skills,
            links: links,
            userInfo: {
                firstName: user.firstName,
                lastName: user.lastName,
                title: user.title,
                email: user.email,
                phone: user.phone,
                profilePicture: user.profilePicture,
                profileDescription: user.profileDescription
            },
            user: user.id
        },
        {
            name: "Hermes",
            employment: employment,
            education: education,
            skills: skills,
            links: links,
            userInfo: {
                firstName: user.firstName,
                lastName: user.lastName,
                title: user.title,
                email: user.email,
                phone: user.phone,
                profilePicture: user.profilePicture,
                profileDescription: user.profileDescription
            },
            user: user.id
        }
    )
}

const employment = [
    {
        title: "Marketing Consultant",
        employer: "Neointec",
        start: "Jan-2019",
        end: "May-2020",
        city: "Alicante",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, dolor alias. Officia architecto facere voluptates ullam dolore magnam inventore obcaecati earum nostrum, odit hic dolores distinctio sunt corrupti delectus modi.",
    },
    {
        title: "Yoga Instructor",
        employer: "Gavin Belson",
        start: "Jan-2019",
        end: "Current",
        city: "Alicante",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, dolor alias. Officia architecto facere voluptates ullam dolore magnam inventore obcaecati earum nostrum, odit hic dolores distinctio sunt corrupti delectus modi.",
    },
]

// const createEmployment = () => {

//     employment.push(
//         {
//             title: "Marketing Consultant",
//             employer: "Neointec",
//             start: "Jan-2019",
//             end: "May-2020",
//             city: "Alicante",
//             description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, dolor alias. Officia architecto facere voluptates ullam dolore magnam inventore obcaecati earum nostrum, odit hic dolores distinctio sunt corrupti delectus modi.",
//         },
//         {
//             title: "Yoga Instructor",
//             employer: "Gavin Belson",
//             start: "Jan-2019",
//             end: "Current",
//             city: "Alicante",
//             description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, dolor alias. Officia architecto facere voluptates ullam dolore magnam inventore obcaecati earum nostrum, odit hic dolores distinctio sunt corrupti delectus modi.",
//         },
//     )
// }


const education = [
    {
        degree: "Marketing",
        school: "King Juan Carlos University",
        start: "2014",
        end: "2018",
        city: "Madrid",
        description: "Just a description",
    },
    {
        degree: "Webdev",
        school: "IronHack",
        start: "2020",
        end: "2020",
        city: "Madrid",
        description: "Just a description 2",
    },
    {
        degree: "Mindfulness",
        school: "Life",
        start: "2014",
        end: "2018",
        city: "Madrid",
        description: "Just a description 3",
    },
]

// const createEducation = () => {

//     education.push(
//         {
//             degree: "Marketing",
//             school: "King Juan Carlos University",
//             start: "2014",
//             end: "2018",
//             city: "Madrid",
//             description: "Just a description",
//         },
//         {
//             degree: "Webdev",
//             school: "IronHack",
//             start: "2020",
//             end: "2020",
//             city: "Madrid",
//             description: "Just a description 2",
//         },
//         {
//             degree: "Mindfulness",
//             school: "Life",
//             start: "2014",
//             end: "2018",
//             city: "Madrid",
//             description: "Just a description 3",
//         },
//     )
// }


const links = [
    {
        label: "Prject 1",
        link: "https://theuselessweb.com/",
    },
    {
        label: "Project 2",
        link: "https://heeeeeeeey.com/",
    }
]

// const createLinks = () => {

//     links.push(

//         {
//             label: "Prject 1",
//             link: "https://theuselessweb.com/",
//         },
//         {
//             label: "Project 2",
//             link: "https://heeeeeeeey.com/",
//         }
//     )
// }

const templates = [
    {
        name: "Apollo"
    },
    {
        name: "Hermes"
    },
    {
        name: "Poseidon"
    },
    {
        name: "Zeus"
    },
    {
        name: "Aphodite"
    },


]

const skills = [
    {
        skill: "Node.js",
        level: 2,
    },
    {
        skill: "JS",
        level: 3,
    },
    {
        skill: "React",
        level: 3,
    },
]



const initialDescriptionValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a textarea !' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    "Since it's rich text, you can do things like turn a selection of text ",
            },
            { text: 'bold', bold: true },
            {
                text:
                    ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'paragraph',
        children: [{ text: 'Try it out for yourself!' }],
    },
]

console.log('THIS IS THE OBJECT WE WANT')
console.log('--------------------------------')
console.log(lulu);
console.log('UNFORMATTED')
console.log('----------------------------')
console.log(exampleDescription)
User.create(users)
    .then(allUsers => allUsers.forEach(user => createCVs(user)))
    .then(() => CV.create(cvs))
    // .then(allCVs => {
    //     allCVs.forEach(cv => {
    //         createEmployment(cv.id)
    //         createEducation(cv.id)
    //         createLinks(cv.id)
    //     })
    // })
    // .then(() => Employment.create(employment))
    // .then(() => Education.create(education))
    // .then(() => Link.create(links))
    .then(() => Template.create(templates))
    .then(() => Description.create({ description: exampleDescription }))
    .then(() => {
        console.log('Ya se ha creado')
        mongoose.connection.close()
    })
    .catch(error => console.log(error))