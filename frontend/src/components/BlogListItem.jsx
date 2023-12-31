import React from 'react';
import {Link} from 'react-router-dom';

const BlogListItem = ({blog}) => {
    return (
        <div className='hb_blog'>
            <Link to={`/blogs/${blog._id}`}>
                <h3 className='hb_blogTitle'>{blog.title}</h3>
                <p className='hb_desc'>{blog.description}</p>
                <div className='hb_blogFooter'>
                    <span>{blog.author}</span>
                    <span>{blog.createdAt.slice(0,10)}</span>
                </div>
            </Link>

        </div>
    )
}

export default BlogListItem