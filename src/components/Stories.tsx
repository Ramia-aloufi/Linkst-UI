import { Avatar } from '@mui/material'

const Stories = ({img,name}:{img:string,name:string}) => {
  return (
    <div className='flex items-center justify-center flex-col cursor-pointer'>
        <Avatar
            alt="Remy Sharp"
            src={img}
            sx={{ width: 80, height: 80, margin: '0 10px' }}
        />
        <span>{name}</span>
    </div>
  )
}

export default Stories