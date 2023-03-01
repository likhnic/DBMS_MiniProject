DROP TABLE IF EXISTS User;
CREATE TABLE User
(
    ID INTEGER NOT NULL,
    Aadhar CHAR(12) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Status VARCHAR(30) NOT NULL,
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
    Aadhar CHAR(12),
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
    AppointmentID INTEGER,
    StartTime DATETIME,
    EndTime DATETIME,
    ExaminationRoom VARCHAR(50),
    PatientAadhar CHAR(12),
    DocID INTEGER,
    PRIMARY KEY(AppointmentID),
    FOREIGN KEY (PatientAadhar) REFERENCES Patient(Aadhar),
    FOREIGN KEY (DocID) REFERENCES Doctor(DocID)
);  

DROP TABLE IF EXISTS Prescribes;
CREATE TABLE Prescribes
(
    Date DATETIME,
    PatientAadhar CHAR(12),
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
    StayID INTEGER,
    StartTime DATETIME, 
    EndTime DATETIME,
    RoomNo INTEGER,
    PatientAadhar CHAR(12),
    PRIMARY KEY (StayID),
    FOREIGN KEY (RoomNo) REFERENCES Room(RoomNo),
    FOREIGN KEY (PatientAadhar) REFERENCES Patient(Aadhar)
);

DROP TABLE IF EXISTS `Procedure`;
CREATE TABLE `Procedure`
(
    Code INTEGER,
    Name VARCHAR(100),
    Cost INTEGER,
    PRIMARY KEY (Code)
);

DROP TABLE IF EXISTS Test;
CREATE TABLE Test
(
    TestID INTEGER,
    Date DATETIME,
    Result VARCHAR(50),
    PatientAadhar CHAR(12),
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
    PatientAadhar CHAR(12),
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