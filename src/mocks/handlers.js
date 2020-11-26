import { rest } from 'msw';


export const handlers = [
  rest.get('https://bookcontent-534e.restdb.io/rest/chapters', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{


        structure: [
          {
            title: "Intro",
            sections: [
              { title: "Section0", completed: true },
              { title: "Section1", completed: false }
            ],
            completed: false
          }
        ]

      }]),
    )
  })
];