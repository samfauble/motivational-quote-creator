import { ddb } from "./dbSetup"

const table = "exampleDB"
const user1 = "abc"
const user2 = "def"
const dummyVals = [
    {
        userId: user1,
        quoteId: "3a4928d"
    },
    {
        userId: user1,
        quoteId: "3a412b28d"
    },
    {
        userId: user2,
        quoteId: "serwnte"
    }
]

describe("DB operations", ()=> {
    test("Add one item to DB", async ()=>{
        await ddb.put({
            TableName: table,
            Item: dummyVals[0]
        }).promise()

        const {Item} = await ddb.query({
            TableName: table,
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": "user1"
            }
        }).promise()

        expect(Item).toEqual({
            userId: user1,
            quoteId: "3a4928d"
        })
    })


    test("Query items for a specific user", async ()=> {
        await ddb.put({
            TableName: table,
            Item: dummyVals[1]
        }).promise()

        await ddb.put({
            TableName: table,
            Item: dummyVals[2]
        }).promise()

        const {Item} = await ddb.query({
            TableName: table,
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": "user1"
            }
        }).promise()

        expect(Item.length).toEqual(2)
    })

    
    test("Delete one item from the DB", async () => {
        await ddb.delete({
            TableName: table,
            Key: {
                "userId": "user2"
            }
        })
    })
})

