/*
listaTest = [test1,test2,...,testN];
test1 = [nomeTest1, descrTest, [dom1,dom2,...,domM]];
dom1 = [testoDom,[risp1,risp2,...,rispP],[indiceRisp1,...indiceRispQ]];
*/
let listaTest = [
    [`Il Browser`,
        `... browser ...`,
        [`Cos'è un Browser`,
            [`Un programma per visualizzare foto`,
             `Un'applicazione per video`,
             `Un programma per la navigazione sul web`
            ], [2]
        ],
        [`Quando aggiornare il browser`,
            [`Mai`,
             `Si aggiorna automaticamente`,
             `Una volta a settimana`,
             `Non si può aggiornare, occorre installarlo di nuovo`
            ], [1]
        ]
    ],
    [`Il pacchetto Office`,
        `... office ...`,
        [`I pacchetti Office più diffusi`,
            [`Microsoft Office`,
             `LibreOffice`,
             `Chrome`,
             `PhotoShop`
            ], [0,1]
        ],
        [`Quando aggiornare il proprio programma Office`,
            [`Mai`,
             `Si aggiorna automaticamente`,
             `Una volta a settimana`,
             `Non si può aggiornare, occorre installarlo di nuovo`,
             `Dipende dal sistema operativo`
            ], [4]
        ]
    ]
];