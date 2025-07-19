import { Avatar, Typography } from '@mui/material'

const Stories = ({img,name}:{img:string,name:string}) => {
  return (
    <div className='flex items-center justify-center flex-col cursor-pointer space-y-2'>
        <Avatar
            src={img}
            sx={{ width: 70, height: 70 }}
        />
      <Typography variant="body2" >{name}</Typography>
    </div>
  )
}

export default Stories