export default {
  bootstrap(mock) {
    let prs = [{
      pr: "1",
      name: '111',
      type: 1,
      materials: [
        {
          id: "1",
          name: "1",
          quantity: 1,
          price: 10.00,
          tax: "9%"
        },
        {
          id: "2",
          name: "12",
          quantity: 12,
          price: 102.00,
          tax: "19%"
        }
      ]

    },
      {
        pr: "2",
        name: '222',
        type: 2,
        materials: [
          {
            id: "1",
            name: "1",
            quantity: 1,
            price: 10.00,
            tax: "9%"
          },
          {
            id: "2",
            name: "12",
            quantity: 12,
            price: 102.00,
            tax: "19%"
          }
        ]
      }
    ];
    mock.onGet('/pr/query').reply(config => {
      let {
        pr
      } = config.params;
      let mockPR = prs.find(PR => {
        return PR.pr == pr;
      });

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            pr: mockPR
          }]);
        }, 500);
      });
    });

  }
};
