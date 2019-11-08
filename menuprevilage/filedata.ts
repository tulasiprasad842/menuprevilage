// export const files = [
//     {
//       name: 'material2',
//       type: 'folder',
//       children: [
//         {
//           name: 'src',
//           type: 'folder',
//         },
//                 { name: 'package.json', type: 'file' },
//                 { name: 'BUILD.bazel', type: 'file' },
             
//             { name: 'lib', type: 'folder' }
        
//       ]
//     },
//     {
//       name: 'angular',
//       type: 'folder',
//       children: [
//         {
//           name: 'packages',
//           type: 'folder',
//           children: [
//             { name: '.travis.yml', type: 'file' },
//             { name: 'firebase.json', type: 'file' }
//           ]
//         },
//         { name: 'package.json', type: 'file' }
//       ]
//     },
//     {
//       name: 'angularjs',
//       type: 'folder',
//       children: [
//         { name: 'gulpfile.js', type: 'file' },
//         { name: 'README.md', type: 'file' }
//       ]
//     }
//   ];


export const files:any= [
    {
      "name": "Serving",
      "link": "tokenserving",
      "icon": "ti-user",
      "submenu": [
        {
          "name": "Token Serving",
          "link": "tokenserving",
          "id": "964693"
        },
        {
          "name": "Print Token",
          "link": "printtoken",
          "id": "102748"
        },
        {
          "name": "Manual Token",
          "link": "manualtoken",
          "id": "897006"
        }
      ],
      "id": "743048"
    },
    {
      "name": "Admin Manager",
      "link": "manualcheckin",
      "icon": "ti-settings",
      "submenu": [
        {
          "name": "Manual Appointments",
          "link": "manualappts",
          "id": "385826"
        },
        {
          "name": "Manual Check-In",
          "link": "manualcheckin",
          "id": "924459"
        },
        {
          "name": "Serives Queue",
          "link": "servicequeue",
          "id": "343395"
        },
        {
          "name": "Priority Change",
          "link": "prioritychange",
          "id": "978103"
        },
        {
          "name": "Token Printing",
          "link": "printtoken",
          "id": "034605"
        }
      ],
      "id": "970278"
    }
  ]

  