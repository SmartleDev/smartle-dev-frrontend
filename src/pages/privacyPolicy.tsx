import React from 'react';
import GradientBlobT from '../components/atom/GradientBlobT';
import { isNull } from '../util/helpers';
import data from '../util/resources/files/privacy.json';

const Title = ({ children }:{children:any}) => <h1 className='text-2xl font-bold text-gray-700 dark:text-gray-300 md:text-3xl'>{children}</h1>
const LI = ({ children, sub }: { children: any, sub?: boolean }) => <li className={`text-sm ${sub?'mb-2':'mb-5'} text-justify text-gray-700 dark:text-gray-400`}>{children}</li>
const List = ({ children, sub }: { children: any, sub?: boolean }) => <ol className={`${sub ? 'mt-3': 'mt-6'} ml-3 md:ml-10 list-decimal`}>{children}</ol>
const ListBlock = ({ children }: { children: any }) => <div className='p-8 rounded-md'>{children}</div>


const PrivacyPolicy = () => {
    return (<>
        <GradientBlobT />
        <div className='my-36 md:w-11/12 mx-auto md:pr-6'>
            <h1 className="text-center text-4xl font-extrabold mb-10">Privacy Policy</h1>
            {
                data.map((d, idx) => {
                    return (
                        <ListBlock key={idx}>
                            <Title>{d.title}</Title>
                            {
                                d.content?.map((content:any, cIdx) => {
                                    return (
                                        <div className='mt-6 '>
                                            <div className=" text-gray-700 dark:text-gray-400 text-justify"
                                                 dangerouslySetInnerHTML={{ __html: content.desc }}
                                            >
                                            </div>
                                            {!isNull(content?.list) && (
                                                <List>
                                                    {content?.list?.map((li:any, key:number) => {
                                                        return (
                                                            <LI key={key}>
                                                                <span dangerouslySetInnerHTML={{ __html: li }}></span>
                                                                {
                                                                    content?.subList?.some((e:any) => e.item - 1 == key) && (<>
                                                                        <List sub={true}>
                                                                            {content?.subList.find((e:any) => e.item - 1 == key)?.list?.map((l:any, lIdx:number) => {
                                                                                return <LI sub={true} key={lIdx}
                                                                                ><span dangerouslySetInnerHTML={{ __html: l }}></span></LI>
                                                                            })}
                                                                        </List>
                                                                    </>)
                                                                }
                                                            </LI>
                                                        )
                                                    })}
                                                </List>
                                            )}
                                        </div>
                                    )
                                })
                            }
                        </ListBlock>
                    );
                })
            }
        </div>
    </>)
}

export default PrivacyPolicy;