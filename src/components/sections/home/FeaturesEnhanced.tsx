import React from 'react'
import './home.css'
import StarIcon from '@mui/icons-material/Star';

function FeaturesEnhanced() {
  return (
    <div style ={{transition:' ease-in-out'}}>
        <div className="mt-32 z-10 overflow-y-hidden relative border-3">
        <h1 className="text-3xl md:text-5xl font-black text-center">Features of Smartle</h1>
        </div>

        <div className='mt-32 flex justify-evenly flex-wrap'>

            <div className = 'smartleFeature mr-1 mt-5' >
                <h1 className = 'featureHeading'>Hybrid <br/> Learning</h1>

                <h3>Hybrid <br /> Learning</h3>
                <p>Choose courses as Hybrid ( Self-paced and Coach Led) or Completely Self-paced</p>
            </div>
            <div className = 'smartleFeature mr-1 mt-5' >
                <h1 className = 'featureHeading' style ={{marginLeft: '45px'}}>International <br/> Coaches</h1>

                <h3>International <br/> Coaches</h3>
                <p>
Instructors and Coaches from around the world to share a global perspective</p>
            </div>
            <div className = 'smartleFeature mr-1 mt-5'>
                <h1 className = 'featureHeading' style ={{paddingBottom : '100px', marginLeft: '60px'}}>Earn  <br/> Completion <br /> Credits</h1>
                <div className = 'flex justify-evenly'>
                <h3>Earn  Completion <br /> Credits</h3> 
                <h1 style = {{margin: "auto", color : '#917EBD', paddingLeft: '28px', paddingBottom:'20px'}}><StarIcon style ={{fontSize: '40px'}}/></h1>
                </div>
                <p> Earn credits for specific courses which can be combined to earn a Micro-Masters Certificate</p>
            </div>
            <div className = 'smartleFeature mr-1 mt-5' >
                <h1 className = 'featureHeading' style ={{marginLeft: '50px'}}>Digital <br/> Certification</h1>

                <h3>Digital <br/> Certification</h3>
                <p> Earn a digital course competition certificate for successful completion of each course</p>
            </div>
            <div className = 'smartleFeature mr-1 mt-5' >
                <h1 className = 'featureHeading' style ={{marginLeft: '75px'}}>Immersive <br/> Content</h1>

                <h3>Immersive <br/> Content</h3>
                <p> Story based learning delivered through a play and learn platform.</p>
            </div>
        

        </div>
    </div>
  )
}

export default FeaturesEnhanced