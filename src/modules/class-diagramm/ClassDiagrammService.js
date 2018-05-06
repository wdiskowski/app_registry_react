
const headers = { "Content-Type": "application/json" };

const classDiagrammData =
    [
        {
            name: "Membership",
            classes: [
                {
                    key: 1,
                    name: "User",
                    properties: [
                      { name: "email", type: "String", visibility: "private" },
                      { name: "password", type: "String", visibility: "private" }
                    ],
                    methods: [
                      { name: "changePassword", parameters: [{ name: "oldPassword", type: "String" }, { name: "newPassword", type: "String" }], visibility: "public" }
                    ]
                },
                {
                    key: 2,
                    name: "Group",
                    properties: [
                      { name: "name", type: "String", visibility: "private" },
                      { name: "description", type: "String", visibility: "private" }
                    ]
                },
                {
                    key: 3,
                    name: "Person",
                    properties: [
                      { name: "firstName", type: "String", visibility: "private" },
                      { name: "lastName", type: "String", visibility: "private" },
                      { name: "birthday", type: "Date", visibility: "private" }
                    ],
                    methods: [
                      { name: "getAge", type: "int", visibility: "public" },
                      { name: "getBirthdayFormated", type: "String", parameters: [{ name: "format", type: "String" }], visibility: "public" }
                    ]

                },
                {
                    key: 4,
                    name: "Address",
                    properties: [
                      { name: "zipCode", type: "String", visibility: "private" },
                      { name: "city", type: "String", visibility: "private" }
                    ]
                }
            ],
            relations: [
                { from: 1, to: 2, relationship: "aggregation", text: "1", toText: "*" },
                { from: 4, to: 3, relationship: "composition" },
                { from: 3, to: 1, relationship: "generalization" }
            ]
        }
    ];

    export function findClassDiagrammData(url, onSuccess) {
        if (process.env.NODE_ENV !== "production") {
            findClassDiagrammDataMock(url, onSuccess);
        } else {
            fetch(url, {
                headers,
                credentials: 'include'
            })
                .then(resp => resp.json())
                .then(json => onSuccess(json));
        }
    }
    
    function findClassDiagrammDataMock(url, onSuccess) {
        new Promise(
            function (resolve, reject) {
                window.setTimeout(
                    function () {
                        resolve(classDiagrammData)
                    }, Math.random() * 2000 + 1000);
            }).then(diagramData => onSuccess(diagramData));
    }



