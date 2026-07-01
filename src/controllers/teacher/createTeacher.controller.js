import Teacher from "../../models/teacher.model.js";

export const createTeacherController  = async (req, res)=>{
    try{
    const {firstName, lastName, joiningDate, subject, status, teacherId, address, contactNumber, emergencyContact, email} = req.body
    if(!firstName || !lastName || !joiningDate || !subject || !status || !teacherId || !address ||!contactNumber  ||!emergencyContact  ||!email ){
       return res.status(400).json({
            success:false,
            message: "please fill all required fileds"
        })
    }
    const verifyStudent = await Teacher.findOne({teacherId});
    if(verifyStudent){
      return res.status(409).json({
        success:false,
        message:"teacher already exist"
       }) 
    }else{
        const createStudent = await Teacher.create({
        firstName,
        lastName,
        joiningDate,
        subject, 
        status,
        teacherId,
        address,
        contactNumber,
        emergencyContact,
        email

    })
    return res.status(201).json({
        success:true,
        message:"teacher created successfully"
    })
    }

    }catch(err){
      return  res.status(500).json({
            success:false,
            message:err.message
        })
    }
}