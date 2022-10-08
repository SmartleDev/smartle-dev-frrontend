import React from 'react'
import './enterprise.css'

function Approach() {
  return ( 
    <div style ={{transition:' ease-in-out'}}>
        <div className="mt-32 z-10 overflow-y-hidden relative border-3">
        <h1 className="text-2xl md:text-4xl font-black text-center">Our Approach</h1>
        <br />
        <p className='text-xl md:text-xl font-black text-center'>We use a collaborative agile approach to deliver outcomes ensuring quick efficient releases</p>
        </div>

        <div className='mt-28 flex justify-evenly flex-wrap'>

            <div className = 'smartleEnterpriseFeature mr-1 mt-5' >
            <h1 className = 'featureEnterpriseHeading' style ={{marginLeft: '30px', paddingBottom : '160px'}}>Need Analysis</h1>

                <h3>Need Analysis</h3>
                <p>Training,
                  <br />
                  Assessment and Certification need analysis</p>
            </div>
            <div className = 'smartleEnterpriseFeature mr-1 mt-5' >
            <h1 className = 'featureEnterpriseHeading' style ={{marginLeft: '70px', lineHeight: '23px'}}>Course <br/> Defination</h1>

                <h3>Course <br /> Defination</h3>
                <p>Gather all relevant materials for the project</p>
            </div>
            <div className = 'smartleEnterpriseFeature mr-1 mt-5' >
                <h1 className = 'featureEnterpriseHeading' style ={{marginLeft: '45px', lineHeight: '23px'}}>Design and<br/>Development</h1>

                <h3>Design and<br/>Development</h3>
                <p>
                Course structuring and media creation</p>
            </div>
            <div className = 'smartleEnterpriseFeature mr-1 mt-5' >
                <h1 className = 'featureEnterpriseHeading' style ={{marginLeft: '45px', lineHeight: '23px'}}>Technology <br/> Integration</h1>

                <h3>Technology <br/> Integration</h3>
                <p>Deployment and integration with corporate systems</p>
            </div>
            <div className = 'smartleEnterpriseFeature mr-1 mt-5' >
            <h1 className = 'featureEnterpriseHeading' style ={{marginLeft: '100px', paddingBottom : '160px'}}>Delivery</h1>

                <h3>Delivery</h3>
                <p>Learning,
                  <br />
                   administration, 
                   <br />
                   change management and hosting</p>
            </div>
        

        </div>
    </div>
  )
}

export default Approach