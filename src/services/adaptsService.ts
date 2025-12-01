import api from '@/lib/axios';
import { AssessmentData } from '@/types/adapts';


/**
 * Save ADAPTS assessment
 *
 * @param {AssessmentData} request
 * @return {*} 
 */
export const saveAssessmentResult = async (request: AssessmentData) => {
  try {
    const { data } = await api.post('/assessments', request);

    return data;
  } catch (error: any) {
    console.log(error)
    throw error.response?.data || { message: 'Save failed' };
  }
}