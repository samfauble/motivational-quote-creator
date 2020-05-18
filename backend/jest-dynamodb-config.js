module.exports = {
    tables: [
      {
        TableName: `exampleDB`,
        KeySchema: [
            {AttributeName: 'userId', KeyType: 'HASH'},
            {AttributeName: 'quoteId', KeyType: 'RANGE'}
        ],
        AttributeDefinitions: [
            {AttributeName: 'userId', AttributeType: 'S'},
            {AttributeName: 'quoteId', AttributeType: 'S'}
        ],
        ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
      },
      // etc
    ],
  };