import Student from "../../models/student.model.js";

export const createstudentController  = async (req, res)=>{
    try{
    const {firstName, lastName, rollNumber, admissionDate, admissionNumber, section, studentClass} = req.body
    if(!firstName || !lastName || !rollNumber || !admissionDate || !admissionNumber || !section || !studentClass){
       return res.status(400).json({
            success:false,
            message: "please fill all required fileds"
        })
    }
    const verifyStudent = await Student.findOne({studentClass, section, rollNumber});
    if(verifyStudent){
      return res.status(201).json({
        success:false,
        message:"student already exist please try different student"
       }) 
    }else{
        const createStudent = await Student.create({
        firstName,
        lastName,
        rollNumber,
        studentClass,
        section,
        admissionDate,
        admissionNumber

    })
    return res.status(200).json({
        success:true,
        message:"Student addedd successfully"
    })
    }

    }catch(err){
      return  res.status(400).json({
            success:false,
            message:err.message
        })
    }
}