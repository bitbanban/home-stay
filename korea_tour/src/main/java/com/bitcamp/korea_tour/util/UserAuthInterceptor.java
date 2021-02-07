package com.bitcamp.korea_tour.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.service.UserService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserAuthInterceptor implements HandlerInterceptor, SessionNames {
	
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
		
        HttpSession session = request.getSession();
        UserDto loginUser= (UserDto) session.getAttribute(USER);
 
        String httpMethod=request.getMethod();

        if(httpMethod.equals("POST") 
        		|| httpMethod.equals("DELETE") 
        		|| httpMethod.equals("PUT") 
        		|| httpMethod.equals("PATCH") 
        		) {
        	
        	if(ObjectUtils.isEmpty(loginUser)){
        		response.sendRedirect("/login");
        		return false;
        	}
        }
        
        return true;
    }
 
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        
    }
 
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        
    }
}
