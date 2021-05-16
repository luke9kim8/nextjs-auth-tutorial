import {table, getMinifiedRecord} from './utils/Airtable'

export default async (req, res) => {
  const {id, fields} = req.body;
  
  try {
    // console.log(req.body)
    const updatedRecords = await table.update([
      {id, fields}
    ]);
    
    res.statusCode = 200;
    res.json(updatedRecords);
  } catch (err) {
    console.log(err)
    res.statusCode = 500;
    res.json({msg: "Something went wrong"})
  }
}