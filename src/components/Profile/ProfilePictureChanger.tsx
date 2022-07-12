import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar';
import image from '../../assets/avatar.png';
const ProfilePictureChanger = () => {
  const [cover_picture, setCoverPicture] = React.useState<File>()
  const Input = styled('input')({
    display: 'none',
  })

  return (
    <div>
     <Avatar
          alt=""
          src={image}
          sx={{ width: 112, height: 112}}
        />
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>

    </div>
  )
}
export default ProfilePictureChanger
