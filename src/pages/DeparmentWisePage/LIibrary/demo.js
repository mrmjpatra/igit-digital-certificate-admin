const dept = {
    branchdept: {
        clerance: true,
        remark: "",
        remarkStatus: true
    },
    hostel: {
        remark: 'Payment', remarkStatus: false, clerance: false, formData: {
            hostelName: 'Brahmos Bhawan', dept: 'MCA', isHosteller: true
        }
    },
    library: {
        clearance: false, remarkStatus: true, remark: 'Hi'
    }
}
const name="hostel";

const updateList={...dept,[name]:{...dept,clearance: true, remarkStatus: true, remark: 'Hello'}}
console.log(updateList)