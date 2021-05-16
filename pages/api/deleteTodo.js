import {table, getMinifiedRecord} from './utils/Airtable'

export default async (req, res) => {
  const {id, fields} = req.body;
  try {
    const deletedRecord = await table.destroy([id]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(deletedRecord[0]));
  } catch (err) {
    console.log(err)
    res.statusCode = 500;
    res.json({msg: "Something went wrong"})
  }
}
