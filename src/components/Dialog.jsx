// import {DialogTitle} from "@mui/material";
// import InputBase from "@mui/material/InputBase";
// import {useState} from "react";
//
// export interface SimpleDialogProps {
//     open: boolean;
//     searchInput: string;
//     onClose: (value: string) => void;
// }
//
// export const Dialog = (props: SimpleDialogProps) => {
//     const {onClose, searchInput, open} = props;
//     const [value, setValue] = useState('');
//
//     const handleClose = () => {
//         onClose(searchInput);
//     };
//
//     const handleSubmit = (value: string) => {
//         onClose(value);
//     };
//
//     return (
//         <Dialog onClose={handleClose} open={open} setValue={searchInput}>
//             {/*<Box>*/}
//             <DialogTitle>Search for Block Height / TX Hash / Validator Address or Name</DialogTitle>
//             <InputBase
//                 onKeyDown={(ev) => {
//                     if (ev.key === 'Enter') {
//                         handleSubmit(ev);
//                     }
//                 }}
//                 sx={{ml: 2, flex: 1, fontSize: '16px'}}
//                 placeholder="Search for Block Height / TX Hash / Validator Address or Name"
//                 value={value}
//                 onChange={(e) => setValue(e.target.value)}/>
//             {/*</Box>*/}
//         </Dialog>
//     );
// }