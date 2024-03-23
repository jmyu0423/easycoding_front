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
import { useAppDispatch, useAppSelector } from '../../helper/hooks'
import { setSelectedId } from '../../features/mypage/BoardSlice'

const CreateBoard = ({ handleOk, handleClose, open }: any) => {
    const dispatch = useAppDispatch()
    const { dataList, selectedId } = useAppSelector(state => state.board)
    const [input, setInput] = useState({ title: '', content: '' })

    useEffect(() => {
        if (open) {
            if (selectedId) {
                for (let i = 0; i < dataList.length; i++) {
                    if (dataList[i].seq == selectedId) {
                        setInput({ title: dataList[i].title, content: dataList[i].content })
                        break;
                    }
                }
            } else {
                setInput({ title: '', content: '' })
            }
        } else {
            dispatch(setSelectedId(''))
        }
        return () => {


        }
    }, [open, selectedId])

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
                        value={input.title}
                        onChange={handleInput}
                    />
                </GridInputWrapper>

                <GridInputWrapper title='내용'>
                    <TextField
                        name="content"
                        fullWidth
                        value={input.content}
                        onChange={handleInput}
                    />
                </GridInputWrapper>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" sx={{ height: '30px' }} onClick={handleClose}>취소</Button>
                <Button variant="contained" sx={{ marginRight: '5px', height: '30px' }} onClick={() => handleOk(input)}>등록</Button>
            </DialogActions>
        </Dialog>
    )
}
export default CreateBoard