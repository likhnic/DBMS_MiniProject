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
    Age INTEGER,
    Gender VARCHAR(10),
    PRIMARY KEY (Aadhar),
    FOREIGN KEY (PCPDocID) REFERENCES Doctor(DocID)
);  

DROP TABLE IF EXISTS Appointment;
CREATE TABLE Appointment
(
    AppointmentID INTEGER NOT NULL AUTO_INCREMENT,
    StartTime TIME,
    StartDate DATE,
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

DROP TABLE IF EXISTS news;
Create TABLE news
(
    body TEXT
);


insert into User (ID, Aadhar, Password, Type, Status) values (1, '194-770-0729', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (2, '248-520-3360', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (3, '362-150-1497', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (4, '751-440-5620', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (5, '495-390-1739', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (6, '113-960-7152', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (7, '668-110-8553', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (8, '409-270-3839', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (9, '655-260-8817', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (10, '748-707-9356', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (11, '271-605-2287', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (12, '296-507-6307', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (13, '549-406-2960', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (14, '781-109-4026', 'password@123', 0, true);
insert into User (ID, Aadhar, Password, Type, Status) values (15, '464-003-6286', 'password@123', 0, true);


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

insert into User (ID, Aadhar, Password, Type, Status) values (16, '204-303-2761', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (17, '522-505-1427', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (18, '469-407-2832', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (19, '595-506-9562', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (20, '356-404-1236', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (21, '500-507-0317', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (22, '353-603-3925', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (23, '811-208-1086', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (24, '356-600-2716', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (25, '329-207-6149', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (26, '284-104-6532', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (27, '824-609-4106', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (28, '225-601-6869', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (29, '156-103-3322', 'password@123', 1, true);
insert into User (ID, Aadhar, Password, Type, Status) values (30, '601-308-9458', 'password@123', 1, true);

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

insert into User (ID, Aadhar, Password, Type, Status) values (31, '425-106-7282', 'password@123', 3, true);
insert into User (ID, Aadhar, Password, Type, Status) values (32, '242-303-8211', 'password@123', 3, true);
insert into User (ID, Aadhar, Password, Type, Status) values (33, '475-003-9309', 'password@123', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (34, '563-009-2838', 'password@123', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (35, '102-504-5073', 'password@123', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (36, '889-306-1403', 'password@123', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (37, '857-907-5094', 'password@123', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (38, '267-105-0013', 'password@123', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (39, '685-708-5024', 'password@123', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (40, '635-901-6886', 'password@123', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (41, '810-004-0913', 'password@123', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (42, '200-807-5881', 'password@123', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (43, '843-703-7637', 'password@123', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (44, '431-403-4822', 'password@123', 3,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (45, '829-303-6505', 'password@123', 3,  true);

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


insert into User (ID, Aadhar, Password, Type, Status) values (46, '445-350-9925', 'password@123', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (47, '560-410-4103', 'password@123', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (48, '697-520-2996', 'password@123', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (49, '438-680-3092', 'password@123', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (50, '588-280-1983', 'password@123', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (51, '218-100-7339', 'password@123', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (52, '797-730-0010', 'password@123', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (53, '590-820-3312', 'password@123', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (54, '491-160-4778', 'password@123', 2,  true);
insert into User (ID, Aadhar, Password, Type, Status) values (55, '721-310-4548', 'password@123', 2,  true);

insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (46, 'Junior Doctor', true, 'Ermentrude Simeons', '896-257-4702', '15010 Valley Edge Junction', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (47, 'Senior Doctor', true, 'Tanney Ivushkin', '104-709-1973', '249 Emmet Street', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (48, 'Junior Doctor', true, 'Patricia Lambkin', '984-456-8245', '04546 Oak Valley Alley', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (49, 'Junior Doctor', true, 'Genvieve Hammell', '273-762-4027', '65 Algoma Hill', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (50, 'Junior Doctor', true, 'Korella Deners', '743-501-8844', '4 Parkside Terrace', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (51, 'Senior Doctor', true, 'Bailie Gower', '301-834-5370', '4654 Gateway Center', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (52, 'Head', false, 'Bradley Beden', '721-772-0669', '81747 Onsgard Point', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (53, 'Senior Doctor', true, 'Aron Bossingham', '917-224-3396', '10 Fairview Avenue', 'likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (54, 'Head', true, 'Cirillo Pinock', '587-336-9936', '24931 Judy Way','likhith26090@gmail.com');
insert into Doctor (DocID, Position, isWorking, Name, Phone, Address, Email) values (55, 'Senior Doctor', true, 'Eldridge Morfey', '312-232-2460', '17455 Manufacturers Parkway', 'likhith26090@gmail.com');


-- insert into Patient Values ('1','ram','099','seattle banswada',11,50, 20, 'M');
-- insert into Patient Values ('2','shyam','099','silicon banswada',10,52, 20, 'M');
-- insert into Patient Values ('3','dam','199','hybrid banswada',12,51, 20, 'M');

-- select * from Prescribes;
-- select * from Doctor;
-- select * from Test;
-- select * from Test where PatientAadhar = 3 AND Code=7;
-- select * from `Procedure`;
-- select * from Patient;
-- select * from Stay;
-- insert into `Procedure` (Code,Name, Cost, Type) values 
-- (1,'X-Ray',100,0),
-- (2,'Check up',200,0),
-- (3,'DAm',100,0),
-- (4,'plus ultra',100,1),
-- (5,'shake up',200,0),
-- (6,'super',100,0),
-- (7,'gym',100,1),
-- (8,'good day',100,1),
-- (9,'biscuit',100,0),
-- (10,'sugar',100,1),
-- (11,'blood test',100,0),
-- (12,'asdm',100,0),
-- (13,'as',100,0);




SELECT StayID FROM Stay WHERE StayID = (SELECT StayID FROM Stay WHERE PatientAadhar = 2 ORDER BY StartTime DESC LIMIT 1);
SELECT TestID,Name from Test,`Procedure` where Test.Code=`Procedure`.Code AND Result='NOT YET AVAILABLE' AND PatientAadhar='1';

select * from Patient where Name regexp 'ya';

select * from Patient;
-- select * from Appointment;
select * from Stay;

select * from Room;
-- Delete from Room;
insert into Room values
(1,'icu',1),
(2,'general ward',1),
(3,'general ward',1),
(4,'general ward',1),
(5,'icu',1),
(6,'super emergency',1),
(7,'new room',0),
(8,'guest room',1);

-- insert into Stay values
-- (1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,1,1);

-- insert into Stay values
-- (2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,1,1),
-- (3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,1,1),
-- (4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,1,1),
-- (6,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,1,1),
-- (5,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,1,1);
-- insert into Stay values 
-- (7,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,2,2),
-- (8,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP+100,3,3);
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


DELIMITER $$
create trigger validateuser
before insert on User
for each row
begin
    if length(new.Aadhar) < 12 or length(new.Aadhar) > 12
    then signal sqlstate  '45000'
        set message_text = 'Aadhar Should be 12 characters';
    end if;
    if length(new.Password) < 6 or length(new.Password) > 16
    then signal sqlstate  '45000'
        set message_text = 'Password Should be between 6 and 16 characters';
    end if;
end;
$$
DELIMITER ;




DELIMITER $$
create trigger validatepatient 
before insert on Patient 
for each row 
begin 
    if length(new.Aadhar) < 12 or length(new.Aadhar) > 12
    then signal sqlstate  '45000' 
        set message_text = 'Aadhar Should be 12 characters';
    end if;
    if length(new.Phone) < 12 or length(new.Phone) > 12
    then signal sqlstate  '45000' 
        set message_text = 'Phone Number Should be 10 characters';
    end if;
end;
$$
DELIMITER ;

DELIMITER $$
create procedure getAppointmentTimeGivenID(IN id int, OUT ok boolean)
begin
    select count(*) >= 1 into ok from Appointment where AppointmentID = id and (StartDate < curdate() or (StartDate = curdate() and StartTime < curtime()));
end;
$$
DELIMITER ;


DELIMITER $$
create trigger validateprescribes
before insert on Prescribes
for each row
begin
    if length(new.Dose) <= 0
    then signal sqlstate  '45000'
        set message_text = 'Quantity cannot be negative';
    end if;
    set @ok = false;
    call getAppointmentTimeGivenID(new.AppointmentID, @ok);
    if @ok = false
    then
        signal sqlstate  '45000'
        set message_text = 'Appointment is in the future';
    end if;
end;
$$
DELIMITER ;

DELIMITER $$
create trigger validateappointment
before insert on Appointment
for each row
begin
    if new.StartDate < curdate() or (new.StartDate = curdate() and new.StartTime < curtime())
    then signal sqlstate  '45000'
        set message_text = 'Appointment Date cannot be in the past';
    end if;
end;
$$
DELIMITER ;

DELIMITER $$
create trigger validatestay
before insert on Stay
for each row
begin
    if new.StartTime < concat(curdate(), ' ', curtime())
    then signal sqlstate  '45000'
        set message_text = 'Start Time cannot be in the past';
    end if;
end;
$$
DELIMITER ;

-- inserts medication into prescribes
drop procedure if exists insertPrescribes;
DELIMITER $$
create procedure insertPrescribes(IN AppointmentIDParam int, IN MedicationCode int, IN Dose varchar(50)) 
begin
    declare DoctorID int;
    declare PatientAadharVal varchar(12);
    declare MedicationPresent boolean;
    select DocID, PatientAadhar into DoctorID, PatientAadharVal from Appointment where AppointmentID = AppointmentIDParam;
    if DoctorID is null or PatientAadharVal is null
    then
        signal sqlstate  '45000'
        set message_text = 'AppointmentID does not exist';
    end if;
    select count(*) >= 1 into MedicationPresent from Medication where MedicationCode = MedicationCode;
    if MedicationPresent = false
    then
        signal sqlstate  '45000'
        set message_text = 'Medication does not exist';
    end if;
    insert into Prescribes(MedicationCode, Dose, DocID, AppointmentID, PatientAadhar, Date) values (MedicationCode, Dose, DoctorID, AppointmentIDParam, PatientAadharVal, CURRENT_TIMESTAMP);
end;
$$
DELIMITER ;
