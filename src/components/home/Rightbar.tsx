
import { Card, Typography } from '@mui/material';
const RightBar = () => {

  return (
    <Card className="bg-gray-700">
      <div className="p-4">
        <Typography className="text-lg font-semibold">Trending Topics</Typography>
        <ul className="mt-2 space-y-2">
          <li>
            <Typography className="text-gray-300">#ReactJS</Typography>
          </li>
          <li>
            <Typography className="text-gray-300">#JavaScript</Typography>
          </li>
          <li>
            <Typography className="text-gray-300">#WebDevelopment</Typography>
          </li>
          <li>
            <Typography className="text-gray-300">#CSS</Typography>
          </li>
        </ul>
      </div>
    </Card>
  )
}

export default RightBar