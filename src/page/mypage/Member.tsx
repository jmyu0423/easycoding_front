import { useEffect, useState } from 'react'
import { getMembers } from '../../features/mypage/MemberSlice'
import { getBoards, createBoards, deleteBoards, setSuccessFlag, setSelectedIdList } from '../../features/mypage/BoardSlice'
import { useAppDispatch, useAppSelector } from '../../helper/hooks'
import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CreateBoard from '../../component/dialog/CreateBoard'

const Member = () => {
    const dispatch = useAppDispatch()
    const { successFlag, dataList, selectedIdList } = useAppSelector(state => state.board)
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    useEffect(() => {
        dispatch(getBoards())

        return () => {
            dispatch(setSuccessFlag(false))
        }
    }, [])

    useEffect(() => {
        if (successFlag) {
            setOpenCreateDialog(false)
            dispatch(setSuccessFlag(false))
            dispatch(getBoards())
        }
    }, [successFlag])


    const columns: GridColDef<(typeof dataList)[number]>[] = [
        {
            field: 'seq',
            headerName: 'ID',
            width: 90,
            renderCell: (index) => {
                return (
                    index.api.getRowIndexRelativeToVisibleRows(index.row.seq) + 1
                )
            }
        },
        {
            field: 'title',
            headerName: '제목',
            width: 200,
            editable: false,
        },
        {
            field: 'content',
            headerName: '내용',
            width: 600,
            editable: false,
        },
        {
            field: 'regDate',
            headerName: '등록 날짜',
            width: 200,
            editable: false,
        },
        {
            field: 'updDate',
            headerName: '수정 날짜',
            width: 200,
            editable: false,
            // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
    ];

    const createBoard = () => {
        setOpenCreateDialog(true)
    }

    const deleteBoard = () => {
        if (selectedIdList.length > 0) {
            dispatch(deleteBoards())
        }
    }

    const handleOk = (input: any) => {
        dispatch(createBoards(input))
    }

    const handleClose = () => {
        setOpenCreateDialog(false);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <div style={{ fontSize: '25px', fontWeight: 'bold', color: 'green' }}>
                    이 지 코 딩
                </div>
                <div>
                    <Button variant="outlined" color="error" sx={{ marginRight: '5px', height: '30px' }} onClick={deleteBoard}>삭제</Button>
                    <Button variant="contained" sx={{ height: '30px' }} onClick={createBoard}>등록</Button>
                </div>
            </div>
            <Box
                sx={{
                    height: 800,
                    width: '100%',
                    border: 1,
                }}>
                <DataGrid
                    rows={dataList}
                    columns={columns}
                    getRowId={(row) => row.seq}
                    rowHeight={40}
                    pageSizeOptions={[10, 25, 50]}

                    checkboxSelection
                    onRowSelectionModelChange={(ids) => {
                        dispatch(setSelectedIdList(ids))
                    }}
                />
            </Box>

            <CreateBoard
                handleOk={handleOk}
                handleClose={handleClose}
                open={openCreateDialog}
            />
        </>
    )
}
export default Member