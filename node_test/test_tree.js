const chai = require("chai");
const assert = chai.assert;
chai.config.truncateThreshold = 0;

describe("Test Prioritize Node", () => {
  it("should work on a basic example", () => {
    const tree = {
      val: 1,
      children: [
        {val: 2},
        {
          val: 3,
          children: [
            {
              val: 4,
              children: [
                {val: 5},
                {val: 6},
                {val: 7}
              ]
            }
          ]
        }
      ]
    };
    
    const expected = {
      val: 1,
      children: [
        {
          val: 3,
          children: [
            {
              val: 4,
              children: [
                {val: 7},
                {val: 5},
                {val: 6}
              ]
            }
          ]
        },
        {val: 2}
      ]
    };
    
    const actual = prioritizeNodes(tree, 7);
    assert.deepEqual(actual, expected, stringify(actual, expected));
  });
  
  it("should work when the root has no children", () => {
    const tree = {val: 1};
    const expected = {val: 1};
    const actual = prioritizeNodes(tree, 7);
    assert.deepEqual(actual, expected, stringify(actual, expected));
  });
  
  it("should work when there are multiple children in one array", () => {
    const tree = {
      val: 1,
      children: [
        {
          val: 1,
          children: [
            {val: 7}
          ]
        },
        {
          val: 3,
          children: [
            {val: 55}
          ]
        },
        {
          val: 2,
          children: [
            {val: 15}
          ]
        },
        {
          val: 7,
          children: [
            {val: 2}
          ]
        }
      ]
    };
    
    const expected = {
      val: 1,
      children: [
        {
          val: 2,
          children: [
            {val: 15}
          ]
        },
        {
          val: 7,
          children: [
            {val: 2}
          ]
        },
        {
          val: 1,
          children: [
            {val: 7}
          ]
        },
        {
          val: 3,
          children: [
            {val: 55}
          ]
        }
      ]
    };

    const actual = prioritizeNodes(tree, 2);
    assert.deepEqual(actual, expected, stringify(actual, expected));
  });
  
  it("should work on a larger example", () => {
    const tree = {
      val: 1,
      children: [
        {
          val: 2,
          children: [
            {
              val: 7,
              children: [
                {val: 2},
                {val: 18},
                {val: 12}
              ]
            }
          ]
        },
        {
          val: 4,
          children: [
            {val: 5},
            {
              val: 6,
              children: [
                {val: 12},
                {val: 11},
                {val: 10},
                {val: 9},
              ]
            },
            {val: 13}
          ]
        },
        {
          val: 3,
          children: [
            {val: 15}
          ]
        },
        {
          val: 17,
          children: [
            {val: 16},
            {
              val: 2,
              children: [
                {val: 14},
                {val: 11},
                {
                  val: 18,
                  children: [
                    {val: 4},
                    {val: 11},
                    {val: 7}
                  ]
                },
                {val: 27},
                {val: 18},
                {val: 29},
              ]
            }
          ]
        }
      ]
    };
   
    const expected = {
      val: 1,
      children: [
        {
          val: 2,
          children: [
            {
              val: 7,
              children: [
                {val: 18}, // <-- this moved up
                {val: 2},
                {val: 12}
              ]
            }
          ]
        },
        {
          val: 17, // <-- this moved up
          children: [
            {
              val: 2, // <-- this moved up
              children: [
                {
                  val: 18, // <-- this moved up
                  children: [
                    {val: 4},
                    {val: 11},
                    {val: 7}
                  ]
                },
                {val: 18}, // <-- this moved up
                {val: 14},
                {val: 11},
                {val: 27},
                {val: 29},
              ]
            },
            {val: 16}
          ]
        },
        {
          val: 4,
          children: [
            {val: 5},
            {
              val: 6,
              children: [
                {val: 12},
                {val: 11},
                {val: 10},
                {val: 9},
              ]
            },
            {val: 13}
          ]
        },
        {
          val: 3,
          children: [
            {val: 15}
          ]
        }
      ]
    };

    const actual = prioritizeNodes(tree, 18);
    assert.deepEqual(actual, expected, stringify(actual, expected));
  });
});

const stringify = (actual, expected) => 
`expected your response\n
${JSON.stringify(actual, null, 2)}\n\nto equal\n
${JSON.stringify(expected, null, 2)}\n\n`
;