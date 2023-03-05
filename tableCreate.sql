USE mini_project;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS User;
CREATE TABLE User
(
    ID INTEGER NOT NULL AUTO_INCREMENT,
    Aadhar VARCHAR(12) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL,
    Type INT NOT NULL,
    Status BOOLEAN NOT NULL,
    PRIMARY KEY (ID) 
);

DROP TABLE IF EXISTS Front_desk_operator;
CREATE TABLE Front_desk_operator
(
    FrontDeskOpID INTEGER NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    Address VARCHAR(200) NOT NULL,
    PRIMARY KEY (FrontDeskOpID),
    FOREIGN KEY (FrontDeskOpID) REFERENCES User (ID)
);

DROP TABLE IF EXISTS Data_entry_operator;
CREATE TABLE Data_entry_operator
(
    DataEntryOpID INTEGER NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    Address VARCHAR(200) NOT NULL,
    PRIMARY KEY (DataEntryOpID),
    FOREIGN KEY (DataEntryOpID) REFERENCES User (ID)
);

DROP TABLE IF EXISTS Database_administrator;
CREATE TABLE Database_administrator
(
    AdminID INTEGER NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    Address VARCHAR(200) NOT NULL,
    PRIMARY KEY (AdminID),
    FOREIGN KEY (AdminID) REFERENCES User (ID)
);

DROP TABLE IF EXISTS Medication;
CREATE TABLE Medication
(
    Code INTEGER NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Brand VARCHAR(100) NOT NULL,
    Description VARCHAR(200) NOT NULL,
    PRIMARY KEY (Code)
);

DROP TABLE IF EXISTS Doctor;
CREATE TABLE Doctor
(
    DocID INTEGER ,
    Position VARCHAR(50) ,
    Name VARCHAR(50) ,
    Phone VARCHAR(20) ,
    Address VARCHAR(200) ,
    isWorking BOOLEAN,
    Email VARCHAR(100),
    PRIMARY KEY (DocID),
    FOREIGN KEY (DocID) REFERENCES User(ID)
);

DROP TABLE IF EXISTS Department;
CREATE TABLE Department
(
    DepartmentID INTEGER NOT NULL,
    Name VARCHAR(50),
    Head INTEGER,
    PRIMARY KEY (DepartmentID),
    FOREIGN KEY (Head) REFERENCES Doctor(DocID)
);

DROP TABLE IF EXISTS Affiliated_with;
CREATE TABLE Affiliated_with
(
    DepartmentID INTEGER NOT NULL,
    DocID INTEGER NOT NULL,
    PRIMARY KEY (DepartmentID, DocID),
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID),
    FOREIGN KEY (DocID) REFERENCES Doctor(DocID)
);

DROP TABLE IF EXISTS Patient;
CREATE TABLE Patient
(
    Aadhar VARCHAR(12) ,
    Name VARCHAR(50),
    Phone VARCHAR(20),
    Address VARCHAR(200),
    InsuranceID INTEGER,
    PCPDocID INTEGER,
    PRIMARY KEY (Aadhar),
    FOREIGN KEY (PCPDocID) REFERENCES Doctor(DocID)
);  

DROP TABLE IF EXISTS Appointment;
CREATE TABLE Appointment
(
    AppointmentID INTEGER NOT NULL AUTO_INCREMENT,
    StartTime DATETIME,
    StartDate DATETIME,
    ExaminationRoom VARCHAR(50),
    PatientAadhar VARCHAR(12),
    DocID INTEGER,
    Emrgncy BOOLEAN,
    PRIMARY KEY(AppointmentID),
    FOREIGN KEY (PatientAadhar) REFERENCES Patient(Aadhar),
    FOREIGN KEY (DocID) REFERENCES Doctor(DocID)
);  

DROP TABLE IF EXISTS Prescribes;
CREATE TABLE Prescribes
(
    Date DATETIME,
    PatientAadhar VARCHAR(12),
    MedicationCode INTEGER,
    DocID INTEGER,
    Dose VARCHAR(100),
    AppointmentID INTEGER,
    PRIMARY KEY (Date, PatientAadhar, MedicationCode, DocID),
    FOREIGN KEY (MedicationCode) REFERENCES Medication(Code),
    FOREIGN KEY (PatientAadhar) REFERENCES Patient(Aadhar),
    FOREIGN KEY (AppointmentID) REFERENCES Appointment(AppointmentID)
);

DROP TABLE IF EXISTS Room;
CREATE TABLE Room
(
    RoomNo INTEGER,
    Type VARCHAR(100),
    Availability BOOLEAN,
    PRIMARY KEY (RoomNo)
);

DROP TABLE IF EXISTS Stay;
CREATE TABLE Stay
(
    StayID INTEGER NOT NULL AUTO_INCREMENT,
    StartTime DATETIME, 
    EndTime DATETIME,
    RoomNo INTEGER,
    PatientAadhar VARCHAR(12),
    PRIMARY KEY (StayID),
    FOREIGN KEY (RoomNo) REFERENCES Room(RoomNo),
    FOREIGN KEY (PatientAadhar) REFERENCES Patient(Aadhar)
);

DROP TABLE IF EXISTS `Procedure`;
CREATE TABLE `Procedure`
(
    Code INTEGER,
    Name VARCHAR(100),
    Type INT NOT NULL,
    Cost INTEGER,
    PRIMARY KEY (Code)
);

DROP TABLE IF EXISTS Test;
CREATE TABLE Test
(
    TestID INTEGER NOT NULL AUTO_INCREMENT,
    Date DATETIME,
    Result VARCHAR(50),
    PatientAadhar VARCHAR(12),
    Code INTEGER,
    PRIMARY KEY(TestID),
    FOREIGN KEY(PatientAadhar) REFERENCES Patient(Aadhar),
    FOREIGN KEY(Code) REFERENCES `Procedure`(Code)
);

DROP TABLE IF EXISTS Undergoes;
CREATE TABLE Undergoes
(
    Date DATETIME,
    StayID INTEGER,
    ProcedureCode INTEGER,
    PatientAadhar VARCHAR(12),
    DocID INTEGER,
    PRIMARY KEY (Date, StayID, ProcedureCode, PatientAadhar),
    FOREIGN KEY (StayID) REFERENCES Stay(StayID),
    FOREIGN KEY (ProcedureCode) REFERENCES `Procedure`(Code),
    FOREIGN KEY (PatientAadhar) REFERENCES Patient(Aadhar),
    FOREIGN KEY (DocID) REFERENCES Doctor(DocID)
);

DROP TABLE IF EXISTS Trained_in;
CREATE TABLE Trained_in
(
    ProcedureCode INTEGER,
    DocID INTEGER,
    CertificationDate DATETIME,
    CertificationExpires DATETIME,
    PRIMARY KEY (ProcedureCode, DocID),
    FOREIGN KEY (ProcedureCode) REFERENCES `Procedure`(Code),
    FOREIGN KEY (DocID) REFERENCES Doctor(DocID)
);

DROP TABLE IF EXISTS TimeSlot;
CREATE TABLE TimeSlot
(
    StartDate DATETIME,
    DocID INTEGER,
    EndDate DATETIME,
    AppointmentID INTEGER,
    PRIMARY KEY (StartDate, DocID),
    FOREIGN KEY (DocID) REFERENCES Doctor(DocID),
    FOREIGN KEY (AppointmentID) REFERENCES Appointment(AppointmentID)
);
SET FOREIGN_KEY_CHECKS = 1;


insert into User (ID, Aadhar, Password, Type, Status) values (1, '194-77-0729', '4eFPFK3ggMpP', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (2, '248-52-3360', 'q4j1yaoPU', 0, false);
insert into User (ID, Aadhar, Password, Type, Status) values (3, '362-15-1497', 'LuHkJJg3', 0, false);
insert into User (ID, Aadhar, Password, Type, Status) values (4, '751-44-5620', 'sFmEaSUYGr', 0, false);
insert into User (ID, Aadhar, Password, Type, Status) values (5, '495-39-1739', 'oQ4hqU', 0, false);
insert into User (ID, Aadhar, Password, Type, Status) values (6, '113-96-7152', '1ezlhke', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (7, '668-11-8553', 'Xws9F7f2t', 0, false);
insert into User (ID, Aadhar, Password, Type, Status) values (8, '409-27-3839', 'YuTHybn21S', 0, false);
insert into User (ID, Aadhar, Password, Type, Status) values (9, '655-26-8817', 'T7SPY5Z3', 0, false);
insert into User (ID, Aadhar, Password, Type, Status) values (10, '748-77-9356', 'spVgo132O5p3', 0, false);
insert into User (ID, Aadhar, Password, Type, Status) values (11, '271-65-2287', 'oVIhHFbamH', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (12, '296-57-6307', '20RAaQ79bqy', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (13, '549-46-2960', 'gFoT6mch0', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (14, '781-19-4026', 'fBdpd4Q9', 0, false);
insert into User (ID, Aadhar, Password, Type, Status) values (15, '464-03-6286', 'qLcISbO', 0, false);


insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (1, 'Sebastien Lefever', '239-199-7154', '7 Calypso Point');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (2, 'Roth Postance', '891-134-2337', '2 Autumn Leaf Drive');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (3, 'Ingrim Scholtis', '219-670-9794', '14812 Prentice Way');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (4, 'Birdie Pain', '824-144-2222', '844 Eastwood Hill');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (5, 'Euell Klosa', '633-173-1712', '69689 Jana Hill');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (6, 'Laney Wanklin', '533-963-8960', '36 Artisan Street');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (7, 'Addi Krolman', '886-421-0464', '59602 International Street');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (8, 'Malorie Gohn', '664-344-9250', '1 Graceland Terrace');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (9, 'Ruby Dilrew', '681-845-9074', '604 Declaration Junction');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (10, 'Suzanna Comley', '995-645-9797', '75 Manitowish Trail');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (11, 'Lorens Bottomore', '331-345-5086', '4 Pawling Alley');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (12, 'Katherina Humpage', '901-476-9921', '9 Twin Pines Point');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (13, 'Arabelle Buddle', '847-339-9243', '510 Loeprich Parkway');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (14, 'Kacy Gedge', '707-996-1453', '8311 Burrows Trail');
insert into Front_desk_operator (FrontDeskOpID, Name, Phone, Address) values (15, 'Ondrea Kenion', '556-954-4111', '4837 Evergreen Court');

insert into User (ID, Aadhar, Password, Type, Status) values (16, '204-33-2761', 'zKP1fxIJV', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (17, '522-55-1427', 'UreXtShlwX1k', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (18, '469-47-2832', '80FJ9s8fQkIT', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (19, '595-56-9562', '1Bf6TW', 1, false);
insert into User (ID, Aadhar, Password, Type, Status) values (20, '356-44-1236', 'VnbKBc', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (21, '500-57-0317', 'CpT0SsCr2cO', 1, false);
insert into User (ID, Aadhar, Password, Type, Status) values (22, '353-63-3925', 'NjMBaOW6a8S', 1, false);
insert into User (ID, Aadhar, Password, Type, Status) values (23, '811-28-1086', 'uOpHhb', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (24, '356-60-2716', 'AkJ6UMi', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (25, '329-27-6149', 'Lxy3GcVL2', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (26, '284-14-6532', 'ntCW4L31W7', 1, false);
insert into User (ID, Aadhar, Password, Type, Status) values (27, '824-69-4106', 'tyVlYQj5Br5', 1, false);
insert into User (ID, Aadhar, Password, Type, Status) values (28, '225-61-6869', 'T3zDhg', 1, false);
insert into User (ID, Aadhar, Password, Type, Status) values (29, '156-13-3322', 'mTnEdMnBc', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (30, '601-38-9458', 'Y6EKbiHS01E', 1, false);

insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (16, 'Gregorio Bohlmann', '147-695-3997', '813 Northport Court');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (17, 'Wilbur Mosedale', '389-337-3092', '60 Declaration Circle');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (18, 'Paulina Kleewein', '387-683-3004', '7447 Oxford Junction');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (19, 'Kerrin Seamark', '231-314-0347', '78 Loomis Point');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (20, 'Abraham Pretor', '619-915-9170', '3 Brickson Park Parkway');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (21, 'Herc Soal', '554-545-5797', '2 Lien Crossing');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (22, 'Denyse Biggen', '430-371-8246', '85 Banding Hill');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (23, 'Adamo Everson', '273-416-0071', '56 Orin Lane');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (24, 'Carlin Iacapucci', '202-603-6475', '60409 Crownhardt Road');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (25, 'Lyssa Rockall', '738-787-5760', '62 Havey Circle');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (26, 'Geri O''Hederscoll', '984-448-0925', '3239 3rd Center');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (27, 'Ruthann Load', '346-622-6589', '3394 Starling Road');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (28, 'Aloin Chaffin', '966-330-7747', '1 Walton Road');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (29, 'Corrinne Elven', '208-231-3310', '2008 Ilene Terrace');
insert into Data_entry_operator (DataEntryOpID, Name, Phone, Address) values (30, 'Laurie Hainey', '583-547-2667', '7 Jay Way');

insert into User (ID, Aadhar, Password, Type, Status) values (31, '425-16-7282', 'X6lbX474K3', 3, true);
insert into User (ID, Aadhar, Password, Type, Status) values (32, '242-33-8211', 'MOXtJs', 3, true);
insert into User (ID, Aadhar, Password, Type, Status) values (33, '475-03-9309', 'Fn5bnaUn9Omo', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (34, '563-09-2838', 'oUFzgjmCXPQ0', 3,  false);
insert into User (ID, Aadhar, Password, Type, Status) values (35, '102-54-5073', 'CphV1A9', 3,  false);
insert into User (ID, Aadhar, Password, Type, Status) values (36, '889-36-1403', 'zQ8YenX', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (37, '857-97-5094', 'X01gJ6', 3,  false);
insert into User (ID, Aadhar, Password, Type, Status) values (38, '267-15-0013', 'RJKErLWLW4tn', 3,  false);
insert into User (ID, Aadhar, Password, Type, Status) values (39, '685-78-5024', 'oPmRPQ7cx', 3,  false);
insert into User (ID, Aadhar, Password, Type, Status) values (40, '635-91-6886', '5H745ayNk', 3,  false);
insert into User (ID, Aadhar, Password, Type, Status) values (41, '810-04-0913', 'idPalGIn', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (42, '200-87-5881', 'SMahjQokL6p4', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (43, '843-73-7637', '7YxExc4PI3', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (44, '431-43-4822', 'vwoVfgRBg', 3,  false);
insert into User (ID, Aadhar, Password, Type, Status) values (45, '829-33-6505', 'm034f2LLpl', 3,  true);

insert into Database_administrator (AdminID, Name, Phone, Address) values (31, 'Hastie Le Fleming', '850-448-0336', '59 Memorial Point');
insert into Database_administrator (AdminID, Name, Phone, Address) values (32, 'Delbert Carnall', '493-625-5739', '3855 3rd Point');
insert into Database_administrator (AdminID, Name, Phone, Address) values (33, 'Nicolais De Stoop', '533-124-0568', '1 Mallard Avenue');
insert into Database_administrator (AdminID, Name, Phone, Address) values (34, 'Brook Waterhowse', '988-257-4129', '91845 Schurz Trail');
insert into Database_administrator (AdminID, Name, Phone, Address) values (35, 'Armand Summerrell', '129-868-0460', '4 Everett Way');
insert into Database_administrator (AdminID, Name, Phone, Address) values (36, 'Pegeen Sprague', '845-196-0380', '6319 Golf View Center');
insert into Database_administrator (AdminID, Name, Phone, Address) values (37, 'Saundra Leiden', '685-472-0743', '0 School Street');
insert into Database_administrator (AdminID, Name, Phone, Address) values (38, 'Effie Hanbury', '204-971-2561', '9 Manley Place');
insert into Database_administrator (AdminID, Name, Phone, Address) values (39, 'Rori Slocom', '662-390-7538', '5880 Barby Court');
insert into Database_administrator (AdminID, Name, Phone, Address) values (40, 'Constance Caville', '549-825-2498', '421 Toban Court');
insert into Database_administrator (AdminID, Name, Phone, Address) values (41, 'Hillard Eudall', '105-644-7691', '4 Express Way');
insert into Database_administrator (AdminID, Name, Phone, Address) values (42, 'Cullie Grimston', '244-802-7403', '89149 Mandrake Trail');
insert into Database_administrator (AdminID, Name, Phone, Address) values (43, 'Leeanne Watchorn', '808-135-6919', '1 Mifflin Street');
insert into Database_administrator (AdminID, Name, Phone, Address) values (44, 'Carlie Bohje', '985-114-8538', '30 Lotheville Trail');
insert into Database_administrator (AdminID, Name, Phone, Address) values (45, 'Russ Bowbrick', '729-508-3521', '2 Ruskin Crossing');


insert into User (ID, Aadhar, Password, Type, Status) values (46, '445-35-9925', 'UuI5BkBte', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (47, '560-41-4103', 'V1Hke5', 2,  false);
insert into User (ID, Aadhar, Password, Type, Status) values (48, '697-52-2996', '5jRQsP04Om3', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (49, '438-68-3092', '79bbhrsNZuo', 2,  false);
insert into User (ID, Aadhar, Password, Type, Status) values (50, '588-28-1983', 'q7mJMa', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (51, '218-10-7339', 'cpyTrOw7oHdk', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (52, '797-73-0010', 'AgLC84vVl', 2,  false);
insert into User (ID, Aadhar, Password, Type, Status) values (53, '590-82-3312', 'ISiqolwRM', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (54, '491-16-4778', '72OMqynb', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (55, '721-31-4548', 'iEWTDi', 2,  true);

insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (46, 'Junior Doctor', true, 'Ermentrude Simeons', '896-257-4702', '15010 Valley Edge Junction', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (47, 'Senior Doctor', false, 'Tanney Ivushkin', '104-709-1973', '249 Emmet Street', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (48, 'Junior Doctor', true, 'Patricia Lambkin', '984-456-8245', '04546 Oak Valley Alley', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (49, 'Junior Doctor', false, 'Genvieve Hammell', '273-762-4027', '65 Algoma Hill', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (50, 'Junior Doctor', true, 'Korella Deners', '743-501-8844', '4 Parkside Terrace', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (51, 'Senior Doctor', true, 'Bailie Gower', '301-834-5370', '4654 Gateway Center', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (52, 'Head', false, 'Bradley Beden', '721-772-0669', '81747 Onsgard Point', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (53, 'Senior Doctor', true, 'Aron Bossingham', '917-224-3396', '10 Fairview Avenue', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (54, 'Head', true, 'Cirillo Pinock', '587-336-9936', '24931 Judy Way','likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (55, 'Senior Doctor', true, 'Eldridge Morfey', '312-232-2460', '17455 Manufacturers Parkway', 'likhith26090@gmail.com');


insert into Patient Values ('1','ram','099','seattle banswada',11,50);
insert into Patient Values ('2','shyam','099','silicon banswada',10,52);
insert into Patient Values ('3','dam','199','hybrid banswada',12,51);

-- select * from Prescribes;
-- select * from Doctor;
-- select * from Test;
-- select * from Test where PatientAadhar = 3 AND Code=7;
-- select * from `Procedure`;
-- select * from Patient;
-- select * from Stay;
Insert into `Procedure` values 
(1,'X-Ray',100,0),
(2,'Check up',200,0),
(3,'DAm',100,0);
Insert into `Procedure` values 
(4,'plus ultra',100,0),
(5,'shake up',200,0),
(6,'super',100,0),
(7,'gym',100,0),
(8,'good day',100,0),
(9,'biscuit',100,0),
(10,'sugar',100,0),
(11,'blood test',100,0),
(12,'asdm',100,0),
(13,'as',100,0);




SELECT StayID FROM Stay WHERE StayID = (SELECT StayID FROM Stay WHERE PatientAadhar = 2 ORDER BY StartTime DESC LIMIT 1);
SELECT TestID,Name from Test,`Procedure` where Test.Code=`Procedure`.Code AND Result='NOT YET AVAILABLE' AND PatientAadhar='1';

select * from Patient where Name regexp 'ya';

select * from Patient;
-- select * from Appointment;
select * from Stay;

select * from Room;
-- Delete from Room;
insert into Room values
(1,'icu',1);
insert into Room values
(2,'general ward',1),
(3,'general ward',1),
(4,'general ward',1),
(5,'icu',1),
(61,'super emergency',1),
(11,'new room',0),
(12,'guest room',1);

insert into Stay values
(1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,1,1);

insert into Stay values
(2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,1,1),
(3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,1,1),
(4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,1,1),
(6,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,1,1),
(5,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,1,1);
insert into Stay values 
(7,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,2,2),
(8,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,3,3);
-- (9,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,2,3);


-- select * from Appointment;
-- select * from Doctor;
-- select * from Room;
-- insert into Appointment values
-- (1,CURRENT_TIMESTAMP+100,CURRENT_TIMESTAMP+500,2,3,50);
-- insert into Appointment values
-- (2,CURRENT_TIMESTAMP+200,CURRENT_TIMESTAMP+500,2,2,50),
-- (3,CURRENT_TIMESTAMP+300,CURRENT_TIMESTAMP+500,2,1,50),
-- (4,CURRENT_TIMESTAMP+400,CURRENT_TIMESTAMP+500,2,2,50),
-- (5,CURRENT_TIMESTAMP+10,CURRENT_TIMESTAMP+500,2,1,52),
-- (6,CURRENT_TIMESTAMP+20,CURRENT_TIMESTAMP+500,2,3,51),
-- (7,CURRENT_TIMESTAMP+150,CURRENT_TIMESTAMP+500,2,1,50);

-- select * from Appointment;
-- select * from Prescribes;
-- select * from `Procedure`;
-- select * from Medication;
-- insert into Medication values 
-- (1,'dolo','mine','nekendukura'),
-- (2,'polo','yours','meekendukura'),
-- (3,'golo','his','endukura'),
-- (4,'lelo','hers','enduke');

-- insert into Prescribes values 
-- (CURRENT_DATE,1,1,52,2,5),
-- (CURRENT_DATE,2,3,50,2,5),
-- (CURRENT_DATE,2,1,51,2,5),
-- (CURRENT_DATE,3,2,50,2,5),
-- (CURRENT_DATE,1,3,52,3,5);

-- insert into Prescribes values
-- (CURRENT_DATE,3,2,53,2,1);
-- insert into Prescribes values
-- (CURRENT_DATE,3,2,51,1,4),
-- (CURRENT_DATE,3,1,50,2,2);