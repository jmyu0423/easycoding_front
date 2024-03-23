import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import { useState, useEffect } from 'react'
import { GridInputWrapper } from './common/pure/GridStyled'

const CreateBoard = ({ handleOk, handleClose, open }: any) => {
    const [intput, setInput] = useState({ title: '', content: '' })

    useEffect(() => {
        return () => {
            setInput({ title: '', content: '' })
        }
    }, [open])

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(pre => ({
            ...pre,
            [event.target.name]: event.target.value,
        }))
    }

    return (
        <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
            <DialogTitle sx={{ fontSize: '16px', fontWeight: 'bold' }}>게시글 등록</DialogTitle>
            <DialogContent>
                <GridInputWrapper title='제목'>
                    <TextField
                        name="title"
                        fullWidth
                        value={intput.title}
                        onChange={handleInput}
                    />
                </GridInputWrapper>

                <GridInputWrapper title='내용'>
                    <TextField
                        name="content"
                        fullWidth
                        value={intput.content}
                        onChange={handleInput}
                    />
                </GridInputWrapper>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" sx={{ height: '30px' }} onClick={handleClose}>취소</Button>
                <Button variant="contained" sx={{ marginRight: '5px', height: '30px' }} onClick={() => handleOk(intput)}>등록</Button>
            </DialogActions>
        </Dialog>
    )
}
export default CreateBoard