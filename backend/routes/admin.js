const express = require("express");
const fetchuser = require("../public/js/fetchuser");
const bcrypt = require("bcryptjs");
const router = express.Router();
const query = require("../dbConnection");

router.use(express.urlencoded({ extended: "false" }));
router.use(express.json());

const types = {
  0: "Front_desk_operator",
  1: "Data_entry_operator",
  2: "Doctor",
  3: "Database_administrator",
};

const type_IDs = {
  0: "FrontDeskOpID",
  1: "DataEntryOpID",
  2: "DocID",
  3: "AdminID",
};

// adding a user
// add fetchuser to the route to make it private later
router.post("/adduser", fetchuser, async (req, res) => {
  let sqlQuery = `INSERT INTO User(Aadhar, Password, Type, Status) VALUES('${req.body.Aadhar}', '${req.body.Password}', ${req.body.Type}, ${req.body.Status})`;
  try {
    let result = await query(sqlQuery);
    if (result.affectedRows == 0) {
      return res.json({ error: "Couldn't add user!" });
    }
    sqlQuery = `SELECT ID FROM User WHERE Aadhar = '${req.body.Aadhar}'`;
    result = await query(sqlQuery);
    return res.json({ ID: result[0].ID });
  } catch (error) {
    console.log(error);
    res.json({ error: "Error adding user" });
  }
});

router.post('/addnews', fetchuser, async (req, res) => {
    // console.log(sqlQuery, news);
    const { news } = req.body;
    let sqlQuery = `INSERT INTO news VALUES('${news}')`;
    try {
        const result = await query(sqlQuery);
        if(result.affectedRows == 0){
            return res.json({error: "Couldn't add news!"});
        }
        console.log(result);
        return res.json({success: "News added successfully!"});
    } catch (error) {
        console.log(error);
        res.json({error: "Error adding news"});
    }
})

// add a doctor
// add fetchuser to the route to make it private later
router.post("/adddoctor", fetchuser, async (req, res) => {
  let sqlQuery = `INSERT INTO Doctor(DocID, Position, Name, Phone, Address, isWorking, Email) VALUES(${req.body.DocID}, '${req.body.Position}', '${req.body.Name}', '${req.body.Phone}', '${req.body.Address}', ${req.body.isWorking}, '${req.body.Email}')`;
  try {
    let result = await query(sqlQuery);
    if (result.affectedRows == 0) {
      return res.json({ error: "Couldn't add doctor!" });
    }
    return res.json({success: "Successfully added"});
  } catch (error) {
    console.log(error);
    res.json({ error: "Error adding doctor" });
  }
});

// getting the doctors list
// add fetchuser to the route to make it private later
router.get("/getdoctors", fetchuser, async (req, res) => {
  let sqlQuery = `Select * from Doctor WHERE 1=(SELECT Status FROM User WHERE ID=DocID)`;
  try {
    let result = await query(sqlQuery);
    if (result.length == 0) {
      return res.json({ empty: "No doctors found!" });
    }
    return res.json({ doctors: result });
  } catch (error) {
    console.log(error);
    res.json({ error: "Error getting doctors" });
  }
});

// getting the doctors list using pattern match
// add fetchuser to the route to make it private later
router.get("/getdoctors/:search", fetchuser, async (req, res) => {
  let sqlQuery = `Select * from Doctor WHERE 1=(SELECT Status FROM User WHERE ID=DocID) AND Name regexp '${req.params.search}'`;
  try {
    let result = await query(sqlQuery);
    if (result.length == 0) {
      return res.json({ empty: "No doctors found!" });
    }
    return res.json({ doctors: result });
  } catch (error) {
    console.log(error);
    res.json({ error: "Error getting doctors" });
  }
});

// updating the doctor's data
// add fetchuser to the route to make it private later
router.put("/updatedoctor", fetchuser, async (req, res) => {
  let sql = `UPDATE Doctor SET Name = '${req.body.Name}', Phone = '${req.body.Phone}', Address = '${req.body.Address}', Position = '${req.body.Position}', isWorking = ${req.body.isWorking}, Email = '${req.body.Email}' WHERE DocID = ${req.body.DocID}`;
  try {
    let result = await query(sql);
    if (result.affectedRows == 0) {
      return res.json({ error: "Cannot update the doctor's data!" });
    }
    return res.json({success: "Successfully updated"});
  } catch (error) {
    console.log(error);
    res.json({ error: "Cannot update the doctor's data!" });
  }
});

// delete the doctor
// add fetchuser to the route to make it private later
router.delete("/deletedoctor/", fetchuser, async (req, res) => {
  let sql = `UPDATE User SET Status=0 WHERE ID = ${req.body.DocID}`;
  try {
    let result = await query(sql);
    if (result.affectedRows == 0) {
      return res.json({ error: "Cannot delete the doctor!" });
    }
    sql = `UPDATE Doctor SET isWorking=0 WHERE DocID=${req.body.DocID}`;
    result = await query(sql);
    if (result.affectedRows == 0) {
      return res.json({ error: "Cannot delete the doctor!" });
    }
    return res.json({success: "Successfully deleted"});
  } catch (error) {
    console.log(error);
    res.json({ error: "Cannot delete the doctor!" });
  }
});

// add a dataentryoperator
// add fetchuser to the route to make it private later
router.post("/adddataentryoperator", fetchuser, async (req, res) => {
  let sqlQuery = `INSERT INTO Data_entry_operator(DataEntryOpID, Name, Phone, Address) VALUES(${req.body.DataEntryOpID}, '${req.body.Name}', '${req.body.Phone}', '${req.body.Address}')`;
  try {
    let result = await query(sqlQuery);
    if (result.affectedRows == 0) {
      return res.json({ error: "Couldn't add dataentryoperator!" });
    }
    return res.json({success: "Successfully added"});
  } catch (error) {
    console.log(error);
    res.json({ error: "Error adding dataentryoperator" });
  }
});

// getting the dataentryoperators list
// add fetchuser to the route to make it private later
router.get("/getdataentryoperators", fetchuser, async (req, res) => {
  let sqlQuery = `Select * from Data_entry_operator WHERE 1=(SELECT Status FROM User WHERE ID=DataEntryOpID)`;
  try {
    let result = await query(sqlQuery);
    if (result.length == 0) {
      return res.json({ empty: "No dataentryoperators found!" });
    }
    return res.json({ dataentryoperators: result });
  } catch (error) {
    console.log(error);
    res.json({ error: "Error getting dataentryoperators!" });
  }
});

// getting the dataentryoperators list
// add fetchuser to the route to make it private later
router.get("/getdataentryoperators/:search", fetchuser, async (req, res) => {
  let sqlQuery = `Select * from Data_entry_operator WHERE 1=(SELECT Status FROM User WHERE ID=DataEntryOpID) AND Name regexp '${req.params.search}'`;
  try {
    let result = await query(sqlQuery);
    if (result.length == 0) {
      return res.json({ empty: "No dataentryoperators found!" });
    }
    return res.json({ dataentryoperators: result });
  } catch (error) {
    console.log(error);
    res.json({ error: "Error getting dataentryoperators!" });
  }
});

// updating the dataentryoperators's data
// add fetchuser to the route to make it private later
router.put("/updatedataentryoperator", fetchuser, async (req, res) => {
  let sql = `UPDATE Data_entry_operator SET Name = '${req.body.Name}', Phone = '${req.body.Phone}', Address = '${req.body.Address}' WHERE DataEntryOpID = ${req.body.DataEntryOpID}`;
  try {
    let result = await query(sql);
    if (result.affectedRows == 0) {
      return res.json({
        error: "Cannot update the dataentryoperators's data!",
      });
    }
    return res.json({success: "Successfully updated"});
  } catch (error) {
    console.log(error);
    res.json({ error: "Cannot update the dataentryoperators's data!" });
  }
});

// delete the dataentryoperators
// add fetchuser to the route to make it private later
router.delete("/deletedataentryoperator/", fetchuser, async (req, res) => {
  let sql = `UPDATE User SET Status=0 WHERE ID = ${req.body.DataEntryOpID}`;
  try {
    let result = await query(sql);
    if (result.affectedRows == 0) {
      return res.json({ error: "Cannot delete the dataentryoperators!" });
    }
    return res.json({success: "Successfully deleted"});
  } catch (error) {
    console.log(error);
    res.json({ error: "Cannot delete the dataentryoperators!" });
  }
});

// add a dbadmin
// add fetchuser to the route to make it private later
router.post("/adddbadmin", fetchuser, async (req, res) => {
  let sqlQuery = `INSERT INTO Database_administrator(AdminID, Name, Phone, Address) VALUES(${req.body.AdminID}, '${req.body.Name}', '${req.body.Phone}', '${req.body.Address}')`;
  try {
    let result = await query(sqlQuery);
    if (result.affectedRows == 0) {
      return res.json({ error: "Couldn't add dbadmin!" });
    }
    return res.json({success: "Successfully added"});
  } catch (error) {
    console.log(error);
    res.json({ error: "Error adding dbadmin" });
  }
});

// getting the dbadmins list
// add fetchuser to the route to make it private later
router.get("/getdbadmins", fetchuser, async (req, res) => {
  let sqlQuery = `Select * from Database_administrator WHERE 1=(SELECT Status FROM User WHERE ID=AdminID)`;
  try {
    let result = await query(sqlQuery);
    if (result.length == 0) {
      return res.json({ empty: "No dbadmins found!" });
    }
    return res.json({ dbadmins: result });
  } catch (error) {
    console.log(error);
    res.json({ error: "Error getting dbadmins!" });
  }
});

// getting the dbadmins list
// add fetchuser to the route to make it private later
router.get("/getdbadmins/:search", fetchuser, async (req, res) => {
  let sqlQuery = `Select * from Database_administrator WHERE 1=(SELECT Status FROM User WHERE ID=AdminID) AND Name regexp '${req.params.search}'`;
  try {
    let result = await query(sqlQuery);
    if (result.length == 0) {
      return res.json({ empty: "No dbadmins found!" });
    }
    return res.json({ dbadmins: result });
  } catch (error) {
    console.log(error);
    res.json({ error: "Error getting dbadmins!" });
  }
});

// updating the dbadmin's data
// add fetchuser to the route to make it private later
router.put("/updatedbadmin", fetchuser, async (req, res) => {
  let sql = `UPDATE Database_administrator SET Name = '${req.body.Name}', Phone = '${req.body.Phone}', Address = '${req.body.Address}' WHERE AdminID = ${req.body.AdminID}`;
  try {
    let result = await query(sql);
    if (result.affectedRows == 0) {
      return res.json({ error: "Cannot update the dbadmin's data!" });
    }
    return res.json({success: "Successfully updated"});
  } catch (error) {
    console.log(error);
    res.json({ error: "Cannot update the dbadmin's data!" });
  }
});


// add a frontdeskoperator
// add fetchuser to the route to make it private later
router.post("/addfrontdeskoperator", fetchuser, async (req, res) => {
  let sqlQuery = `INSERT INTO Front_desk_operator(FrontDeskOpID, Name, Phone, Address) VALUES(${req.body.FrontDeskOpID}, '${req.body.Name}', '${req.body.Phone}', '${req.body.Address}')`;
  try {
    let result = await query(sqlQuery);
    if (result.affectedRows == 0) {
      return res.json({ error: "Couldn't add frontdeskoperator!" });
    }
    return res.json({success: "Successfully added"});
  } catch (error) {
    console.log(error);
    res.json({ error: "Error adding frontdeskoperator" });
  }
});

// getting the frontdeskoperators list
// add fetchuser to the route to make it private later
router.get("/getfrontdeskoperators", fetchuser, async (req, res) => {
  let sqlQuery = `Select * from Front_desk_operator WHERE 1=(SELECT Status FROM User WHERE ID=FrontDeskOpID)`;
  try {
    let result = await query(sqlQuery);
    if (result.length == 0) {
      return res.json({ empty: "No frontdeskoperators found!" });
    }
    return res.json({ frontdeskoperators: result });
  } catch (error) {
    console.log(error);
    res.json({ error: "Error getting frontdeskoperators!" });
  }
});

// getting the frontdeskoperators list
// add fetchuser to the route to make it private later
router.get("/getfrontdeskoperators/:search", fetchuser, async (req, res) => {
  let sqlQuery = `Select * from Front_desk_operator WHERE 1=(SELECT Status FROM User WHERE ID=FrontDeskOpID) AND Name regexp '${req.params.search}'`;
  try {
    let result = await query(sqlQuery);
    if (result.length == 0) {
      return res.json({ empty: "No frontdeskoperators found!" });
    }
    return res.json({ frontdeskoperators: result });
  } catch (error) {
    console.log(error);
    res.json({ error: "Error getting frontdeskoperators!" });
  }
});

// updating the frontdeskoperator's data
// add fetchuser to the route to make it private later
router.put("/updatefrontdeskoperator", fetchuser, async (req, res) => {
  let sql = `UPDATE Front_desk_operator SET Name = '${req.body.Name}', Phone = '${req.body.Phone}', Address = '${req.body.Address}' WHERE FrontDeskOpID = ${req.body.FrontDeskOpID}`;
  try {
    let result = await query(sql);
    if (result.affectedRows == 0) {
      return res.json({ error: "Cannot update the frontdeskoperator's data!" });
    }
    return res.json({success: "Successfully updated"});
  } catch (error) {
    console.log(error);
    res.json({ error: "Cannot update the frontdeskoperator's data!" });
  }
});

// delete the frontdeskoperator
// add fetchuser to the route to make it private later
router.delete("/deletefrontdeskoperator/", fetchuser, async (req, res) => {
  let sql = `UPDATE User SET Status=0 WHERE ID = ${req.body.FrontDeskOpID}`;
  try {
    let result = await query(sql);
    if (result.affectedRows == 0) {
      return res.json({ error: "Cannot delete the frontdeskoperator!" });
    }
    return res.json({success: "Successfully deleted"});
  } catch (error) {
    console.log(error);
    res.json({ error: "Cannot delete the frontdeskoperator!" });
  }
});

router.delete("/user/:ID/:type", fetchuser, async (req, res) => {
  // if (req.user.ID != req.params.ID) {
  //     return res.json({ error: "You are not authorized to do this operation!" })
  // }
  const ID = req.params.ID;
  const type_index = req.params.type;
  sqlQuery = `Select * from User where ID = ${ID} AND status = 1`;
  try {
    let result = await query(sqlQuery);
    if (result.length == 0) {
      return res.json({ error: "There is no such user!!!" });
    }
  } catch (error) { 
    console.log(error);
    return res.json({ error: error });
  }
  if (type_index == 2) {
    let sqlQuery1 = `UPDATE User SET Status = 0 where ID = ${ID}`;
    let sqlQuery2 = `UPDATE Doctor SET isWorking = 0 where ${type_IDs[type_index]} = ${ID}`;
    try {
      let result1 = await query(sqlQuery1);
      let result2 = await query(sqlQuery2);
      return res.json({
        result1: result1,
        result2: result2,
      });
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  } else {
    let sqlQuery1 =
      "DELETE FROM " +
      types[type_index] +
      " WHERE " +
      type_IDs[type_index] +
      "= " +
      ID;
    let sqlQuery2 = "DELETE FROM User WHERE ID = " + ID;
    console.log(sqlQuery1);
    console.log(sqlQuery2);
    try {
      let result1 = await query(sqlQuery1);
      let result2 = await query(sqlQuery2);
      return res.json({
        result1: result1,
        result2: result2,
      });
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  }
});

router.post("/user", fetchuser, async (req, res) => {
  // if (req.user.ID != req.params.ID) {
  //     return res.json({ error: "You are not authorized to do this operation!" })
  // }
  const {
    ID,
    type_index,
    Aadhar,
    Password,
    Password_confirm,
    Name,
    Phone,
    Address,
    Position,
  } = req.body;

  console.log(req.body);
  let sqlQuery1 =
    "SELECT " +
    type_IDs[type_index] +
    " FROM " +
    types[type_index] +
    " WHERE " +
    type_IDs[type_index] +
    " = " +
    ID;
  console.log(sqlQuery1);
  try {
    let result1 = await query(sqlQuery1);
    if (result1.length > 0) {
      return res.status(409).json({
        error: "ID already exists",
      });
    } else if (Password !== Password_confirm) {
      return res.status(400).json({
        error: "password and confirm password do not match",
      });
    } else {
      let hashedPassword = await bcrypt.hash(Password, 8);
      let sqlQuery2 = `INSERT INTO User values (${ID},"${Aadhar}","${hashedPassword}",1, ${type_index})`;
      let sqlQuery3;
      if (type_index == 2)
        sqlQuery3 = `INSERT INTO ${types[type_index]} values (${ID},"${Position}","${Name}","${Phone}","${Address}",1)`;
      else
        sqlQuery3 = `INSERT INTO ${types[type_index]} values (${ID},"${Name}","${Phone}","${Address}")`;

      // ID name phone address
      console.log(sqlQuery2);
      console.log(sqlQuery3);
      try {
        let result2 = await query(sqlQuery2);
        let result3 = await query(sqlQuery3);
        return res.json({
          result2: result2,
          resutl3: result3,
        });
      } catch (error) {
        console.log(error);
        return res.json({ error: error });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});

router.post("/login", fetchuser, async (req, res) => {
  const { ID, Password } = req.body;

  let sqlQuery = `SELECT * FROM User WHERE ID = ${ID} AND Status=1;`;
  console.log(sqlQuery);
  try {
    const result = await query(sqlQuery);
    console.log(result.length);
    if (result.length == 0) {
      return res.json({ error: "Invalid Credentials" });
    }
    const comPass = bcrypt.compare(Password, result[0].Password);
    if (!comPass) {
      return res.json({ error: "Invalid Credentials" });
    }
    // const token = jwt.sign({user: {id: result.rows[0].ID}}, "secrethaha")
    // return res.json({user: token})
    return res.json({ success: "successfully logged in" });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});

router.get("/", (req, res) => {
  res.json({ success: "Website is live!" });
});

// router.listen(7001, () => {
//     console.log("server started on port ", 7001)
// })

module.exports = router
